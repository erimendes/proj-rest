#!/bin/bash
# Nome: 13-backend-orders-final.sh
# Objetivo: Refatorar Orders (Schema, DTO, Service, Controller)
BACKEND_PATH="minha-api-restaurante" 

cd "$BACKEND_PATH" || { echo "❌ Erro: Pasta $BACKEND_PATH não encontrada."; exit 1; }

echo "🛠️ Atualizando Schema do Prisma..."

# 1. Atualizar o Schema (Incluindo a relação corrigida e o generator)
# Nota: Ajustamos o generator para o provider correto e a relação da Order
cat > prisma/schema.prisma <<'EOF'
generator client {
  provider      = "prisma-client"
  output        = "../src/generated/prisma"
  moduleFormat  = "cjs"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String
  name      String?
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  orders    Order[]
  sessions  Session[]
}

model Session {
  id           String   @id @default(uuid())
  refreshToken String
  userId       String
  userAgent    String?
  ip           String?
  revoked      Boolean  @default(false)
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Category {
  id       String    @id @default(uuid())
  name     String
  products Product[]
}

model Product {
  id          String      @id @default(uuid())
  name        String      @unique
  description String?
  price       Decimal     @db.Decimal(10, 2)
  imageUrl    String?
  categoryId  String
  createdAt   DateTime    @default(now())
  category    Category    @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
}

model Table {
  id     String      @id @default(uuid())
  number Int         @unique
  status TableStatus @default(FREE)
  orders Order[]
}

model Order {
  id         String      @id @default(uuid())
  tableId    String
  userId     String
  status     OrderStatus @default(PENDING)
  totalPrice Decimal     @default(0) @db.Decimal(10, 2)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  table      Table       @relation(fields: [tableId], references: [id], onDelete: Restrict)
  user       User        @relation(fields: [userId], references: [id])
  items      OrderItem[]
}

model OrderItem {
  id          String   @id @default(uuid())
  status      String   @default("PENDING")
  orderId     String
  productId   String
  quantity    Int
  unitPrice   Decimal  @db.Decimal(10, 2)
  observation String?
  createdAt   DateTime @default(now())
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product     Product  @relation(fields: [productId], references: [id])

  @@map("order_items")
}

enum Role {
  USER
  ADMIN
  MANAGER
  WAITER
  CHEF
}

enum TableStatus {
  FREE
  OCCUPIED
  RESERVED
}

enum OrderStatus {
  PENDING
  PREPARING
  READY
  CLOSED
  DELIVERED
  CANCELED
}
EOF

# Gerar o cliente Prisma
npx prisma generate

echo "📦 2/4 - Atualizando DTOs (Swagger Ready)..."
mkdir -p src/modules/order/dto
cat > src/modules/order/dto/create-order.dto.ts <<'EOF'
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ example: 'uuid-do-produto' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-da-mesa' })
  @IsUUID()
  @IsNotEmpty()
  tableId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
EOF

# Criar o AddItemDto que é usado no seu Service
cat > src/modules/order/dto/add-item.dto.ts <<'EOF'
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class AddItemDto {
  @ApiProperty()
  @IsUUID()
  orderId: string;

  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observation?: string;
}
EOF

echo "⚙️ 3/4 - Atualizando OrderService (Lógica de Itens)..."
cat > src/modules/order/order.service.ts <<'EOF'
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrderStatus, TableStatus } from '../../generated/prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const table = await tx.table.findUnique({ where: { id: dto.tableId } });
      if (!table) throw new NotFoundException('Mesa não encontrada');
      if (table.status !== 'FREE') throw new BadRequestException('Mesa ocupada');

      const order = await tx.order.create({
        data: {
          table: { connect: { id: dto.tableId } },
          user: { connect: { id: userId } },
          status: 'PENDING',
          totalPrice: 0,
        },
      });

      await tx.table.update({
        where: { id: dto.tableId },
        data: { status: 'OCCUPIED' },
      });

      if (dto.items && dto.items.length > 0) {
        let total = 0;
        for (const item of dto.items) {
          const product = await tx.product.findUnique({ where: { id: item.productId } });
          if (!product) throw new NotFoundException(`Produto ${item.productId} não encontrado`);
          await tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: product.price,
            },
          });
          total += Number(product.price) * item.quantity;
        }
        return await tx.order.update({
          where: { id: order.id },
          data: { totalPrice: total },
          include: { items: true }
        });
      }
      return order;
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { table: true, user: { select: { name: true } }, _count: { select: { items: true } } },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, table: true, user: { select: { name: true } } },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async addItem(dto: AddItemDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    return this.prisma.$transaction(async (tx) => {
      const newItem = await tx.orderItem.create({
        data: {
          orderId: dto.orderId,
          productId: dto.productId,
          quantity: dto.quantity,
          unitPrice: product.price,
          observation: dto.observation || null,
        },
      });

      const allItems = await tx.orderItem.findMany({ where: { orderId: dto.orderId } });
      const newTotal = allItems.reduce((acc, item) => acc + (Number(item.unitPrice) * item.quantity), 0);
      
      await tx.order.update({ where: { id: dto.orderId }, data: { totalPrice: newTotal } });
      return { message: 'Item adicionado', item: newItem };
    });
  }
}
EOF

echo "🎮 4/4 - Atualizando OrderController (Swagger Pro)..."
cat > src/modules/order/order.controller.ts <<'EOF'
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus } from '../../generated/prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar pedido' })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const userId = req.user.id || req.user.sub;
    return this.orderService.create(userId, createOrderDto);
  }

  @Post('add-item')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Adicionar item a pedido existente' })
  async addItem(@Body() addItemDto: AddItemDto) {
    return this.orderService.addItem(addItemDto);
  }

  // CORREÇÃO: Rota que o Frontend estava chamando e dando 404
  @Get('pending')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar pedidos abertos' })
  async listPending() {
    const all = await this.orderService.findAll();
    // Filtra apenas o que não está finalizado
    return all.filter(order => order.status === 'PENDING' || order.status === 'PREPARING');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER, Role.CHEF)
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.orderService.updateStatus(id, status);
  }
}
EOF

echo "✅ Script Finalizado! Agora o Swagger mostrará os campos de entrada detalhados."
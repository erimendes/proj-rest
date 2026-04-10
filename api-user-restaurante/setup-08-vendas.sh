#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📝 SCRIPT-08: IMPLEMENTANDO MOTOR DE PEDIDOS${NC}"

#########################################
# PASSO 1: GERAR MÓDULOS
#########################################
npx nest g module modules/order
npx nest g controller modules/order --no-spec
npx nest g service modules/order --no-spec

#########################################
# PASSO 2: ORDER SERVICE (A Lógica Complexa)
#########################################
cat << 'EOF' > src/modules/order/order.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrderStatus, TableStatus } from '../../generated/prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, tableId: string) {
    // 1. Verificar se a mesa existe e está livre
    const table = await this.prisma.table.findUnique({ where: { id: tableId } });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    if (table.status !== TableStatus.FREE) {
      throw new BadRequestException('Esta mesa já está ocupada ou reservada');
    }

    // 2. Criar pedido e ocupar a mesa (Transação)
    return this.prisma.$transaction(async (tx) => {
      await tx.table.update({
        where: { id: tableId },
        data: { status: TableStatus.OCCUPIED }
      });

      return tx.order.create({
        data: {
          userId,
          tableId,
          status: OrderStatus.PENDING,
          totalPrice: 0
        }
      });
    });
  }

  async addItem(orderId: string, productId: string, quantity: number, observation?: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    if (order.status === OrderStatus.CLOSED || order.status === OrderStatus.CANCELED) {
      throw new BadRequestException('Não é possível adicionar itens a um pedido fechado');
    }

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    const unitPrice = product.price;

    return this.prisma.$transaction(async (tx) => {
      // Adiciona o item
      const item = await tx.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
          unitPrice,
          observation
        }
      });

      // Recalcula o total do pedido
      const allItems = await tx.orderItem.findMany({ where: { orderId } });
      const newTotal = allItems.reduce((acc, curr) => {
        return acc + (Number(curr.unitPrice) * curr.quantity);
      }, 0);

      await tx.order.update({
        where: { id: orderId },
        data: { totalPrice: newTotal }
      });

      return item;
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { 
        items: { include: { product: true } },
        table: true,
        user: { select: { name: true, email: true } }
      }
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }
}
EOF

#########################################
# PASSO 3: ORDER CONTROLLER
#########################################
cat << 'EOF' > src/modules/order/order.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  @ApiOperation({ summary: 'Abrir novo pedido para uma mesa' })
  create(@Req() req: any, @Body('tableId') tableId: string) {
    return this.orderService.create(req.user.userId, tableId);
  }

  @Post(':id/items')
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  @ApiOperation({ summary: 'Adicionar item ao pedido' })
  addItem(
    @Param('id') id: string,
    @Body() data: { productId: string, quantity: number, observation?: string }
  ) {
    return this.orderService.addItem(id, data.productId, data.quantity, data.observation);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes do pedido (incluindo itens)' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
EOF

#########################################
# PASSO 4: FINALIZAÇÃO
#########################################
npx prisma db push
npx prisma generate

echo -e "\n${BLUE}✅ MOTOR DE PEDIDOS INSTALADO COM SUCESSO!${NC}"
echo -e "O sistema agora calcula totais e protege o status das mesas automaticamente."
#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}👨‍🍳 SCRIPT-09: IMPLEMENTANDO FLUXO DE COZINHA E FECHAMENTO${NC}"

#########################################
# PASSO 1: ATUALIZAR O ORDER SERVICE
#########################################
echo -e "${GREEN}👉 Passo 1: Adicionando lógica de transição de status...${NC}"

# Vamos sobrescrever o service para incluir as novas funções de status
cat << 'EOF' > src/modules/order/order.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrderStatus, TableStatus } from '../../generated/prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, tableId: string) {
    const table = await this.prisma.table.findUnique({ where: { id: tableId } });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    if (table.status !== TableStatus.FREE) throw new BadRequestException('Mesa ocupada');

    return this.prisma.$transaction(async (tx) => {
      await tx.table.update({ where: { id: tableId }, data: { status: TableStatus.OCCUPIED } });
      return tx.order.create({ data: { userId, tableId, status: OrderStatus.PENDING, totalPrice: 0 } });
    });
  }

  async addItem(orderId: string, productId: string, quantity: number, observation?: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    return this.prisma.$transaction(async (tx) => {
      await tx.orderItem.create({ data: { orderId, productId, quantity, unitPrice: product.price, observation } });
      const allItems = await tx.orderItem.findMany({ where: { orderId } });
      const newTotal = allItems.reduce((acc, curr) => acc + (Number(curr.unitPrice) * curr.quantity), 0);
      return tx.order.update({ where: { id: orderId }, data: { totalPrice: newTotal } });
    });
  }

  // --- NOVAS FUNÇÕES DO SCRIPT 09 ---

  async listPending() {
    return this.prisma.order.findMany({
      where: { status: { in: [OrderStatus.PENDING, OrderStatus.PREPARING] } },
      include: { items: { include: { product: true } }, table: true },
      orderBy: { createdAt: 'asc' }
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Pedido não encontrado');

    // Se o pedido for fechado ou cancelado, liberamos a mesa
    if (status === OrderStatus.CLOSED || status === OrderStatus.CANCELED) {
      return this.prisma.$transaction(async (tx) => {
        await tx.table.update({ where: { id: order.tableId }, data: { status: TableStatus.FREE } });
        return tx.order.update({ where: { id }, data: { status } });
      });
    }

    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, table: true, user: { select: { name: true } } }
    });
  }
}
EOF

#########################################
# PASSO 2: ATUALIZAR O ORDER CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 2: Protegendo rotas da cozinha com RBAC...${NC}"

cat << 'EOF' > src/modules/order/order.controller.ts
import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus } from '../../generated/prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  create(@Req() req: any, @Body('tableId') tableId: string) {
    return this.orderService.create(req.user.userId, tableId);
  }

  @Post(':id/items')
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  addItem(@Param('id') id: string, @Body() data: { productId: string, quantity: number, observation?: string }) {
    return this.orderService.addItem(id, data.productId, data.quantity, data.observation);
  }

  @Get('kitchen/pending')
  @Roles(Role.ADMIN, Role.CHEF)
  @ApiOperation({ summary: 'Listar pedidos pendentes para a cozinha (Admin/Chef)' })
  listPending() {
    return this.orderService.listPending();
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CHEF, Role.WAITER)
  @ApiOperation({ summary: 'Alterar status do pedido (Fluxo de trabalho)' })
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
EOF

#########################################
# PASSO 3: LIMPEZA E FINALIZAÇÃO
#########################################
npx prisma generate
echo -e "\n${GREEN}✅ SISTEMA COMPLETO!${NC}"
echo -e "${BLUE}Resumo do fluxo final:${NC}"
echo -e "1. Garçom abre pedido (Mesa fica Ocupada)"
echo -e "2. Chef vê em /kitchen/pending e muda para PREPARING"
echo -e "3. Chef termina e muda para READY"
echo -e "4. Garçom entrega e fecha o pedido (Mesa fica Livre automaticamente)"
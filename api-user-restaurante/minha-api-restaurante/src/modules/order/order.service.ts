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

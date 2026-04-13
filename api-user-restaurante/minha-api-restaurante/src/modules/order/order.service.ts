import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException,
  UnauthorizedException 
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrderStatus } from '../../generated/prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  /**
   * 1. Criar pedido inicial (Usado quando a mesa está FREE)
   */
  async create(userId: string, dto: CreateOrderDto) {
    if (!userId) throw new UnauthorizedException('Usuário não identificado.');

    console.log(`--- 🚀 CRIANDO NOVO PEDIDO: Mesa ${dto.tableId} ---`);

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Validar Mesa
        const table = await tx.table.findUnique({ where: { id: dto.tableId } });
        if (!table) throw new NotFoundException('Mesa não encontrada.');
        if (table.status !== 'FREE') throw new BadRequestException('Esta mesa já possui um pedido aberto.');

        // Criar a Order
        const order = await tx.order.create({
          data: {
            table: { connect: { id: dto.tableId } },
            user: { connect: { id: userId } },
            status: 'PENDING',
            totalPrice: 0,
          },
        });

        // Ocupar a Mesa
        await tx.table.update({
          where: { id: dto.tableId },
          data: { status: 'OCCUPIED' },
        });

        // Processar itens iniciais
        if (dto.items && dto.items.length > 0) {
          let total = 0;
          for (const item of dto.items) {
            const product = await tx.product.findUnique({ where: { id: item.productId } });
            if (!product) throw new NotFoundException(`Produto ${item.productId} não encontrado.`);

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
            include: { items: { include: { product: true } } }
          });
        }

        return order;
      });
    } catch (error) {
      console.error('🔥 ERRO NA CRIAÇÃO DO PEDIDO:', error.message);
      if (error.status) throw error;
      throw new InternalServerErrorException('Erro ao processar criação do pedido.');
    }
  }

  /**
   * 2. Adicionar Item a pedido existente (Usado quando a mesa está OCCUPIED)
   */
  async addItem(dto: AddItemDto) {
    console.log(`--- ➕ ADICIONANDO ITEM: Pedido ${dto.orderId} ---`);

    try {
      const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
      if (!product) throw new NotFoundException('Produto não encontrado.');

      return await this.prisma.$transaction(async (tx) => {
        // Criar o item vinculado à Order existente
        const newItem = await tx.orderItem.create({
          data: {
            orderId: dto.orderId,
            productId: dto.productId,
            quantity: dto.quantity,
            unitPrice: product.price,
            observation: dto.observation || null,
          },
        });

        // Recalcular Total da Order
        const allItems = await tx.orderItem.findMany({ where: { orderId: dto.orderId } });
        const newTotal = allItems.reduce((acc, item) => {
          return acc + (Number(item.unitPrice) * item.quantity);
        }, 0);

        await tx.order.update({
          where: { id: dto.orderId },
          data: { totalPrice: newTotal },
        });

        return { message: 'Item adicionado com sucesso', item: newItem, currentTotal: newTotal };
      });
    } catch (error) {
      console.error('❌ ERRO AO ADICIONAR ITEM:', error.message);
      if (error.status) throw error;
      throw new InternalServerErrorException('Erro ao adicionar item ao pedido.');
    }
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { 
        table: true, 
        user: { select: { name: true } }, 
        items: { include: { product: true } } 
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } }, table: true, user: { select: { name: true } } },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado.');
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }
}

#!/bin/bash

API_NAME="minha-api-v5"

# Verifica se está na pasta correta
if [ -d "$API_NAME" ]; then
    cd $API_NAME
else
    echo "❌ Pasta $API_NAME não encontrada."
    exit 1
fi

echo "🚀 Atualizando rotas do Dashboard no Backend..."

# 1. Adicionando o método no Controller
# Note: Estamos usando o decorator @Get('reports/sales')
# Este trecho deve ser adicionado ao final da classe OrderController
# @Get('reports/sales')
# async getSalesReport() {
#   return this.orderService.getSalesReport();
# }
echo "💡 Certifique-se de que seu OrderController tenha a rota GET 'reports/sales' chamando o service."

# 2. Atualizando o OrderService com a lógica de agregação do Prisma
# Vou gerar o código para você copiar e colar no método getSalesReport() do seu service atual:

cat <<'EOF' > src/order/order.controller.ts
// src/order/order.controller.ts
import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { AddItemDto } from './dto/add-item.dto.js';
import { OrderStatus } from '../generated/prisma/enums.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Post('add-item') // 👈 Agora a rota /orders/add-item existe!
  addItem(@Body() dto: AddItemDto) {
    return this.service.addItem(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Adicione este método ao seu src/order/order.controller.ts

  @Patch(':id/finish')
  finishOrder(@Param('id') id: string) {
    return this.service.finishOrder(id);
  }

 @Patch(':id/status')
  // Note que removemos o ('status') de dentro do @Body
  updateStatus(
    @Param('id') id: string, 
    @Body() dto: UpdateStatusDto // 👈 Aqui ele valida o objeto inteiro
  ) {
    // Agora passamos dto.status para o service
    return this.service.updateStatus(id, dto.status);
  }

  @Get('table/:tableId')
  findOpenByTable(@Param('tableId') tableId: string) {
    return this.service.findOpenByTable(tableId);
  }

  @Delete('item/:orderItemId')
  removeItem(@Param('orderItemId') orderItemId: string) {
    return this.service.removeItem(orderItemId);
  }

  @Get('reports/sales')
  getSalesReport() {
    return this.service.getSalesReport();
  }

  @Get('kitchen/queue')
  getKitchenQueue() {
    return this.service.getKitchenQueue();
  }

  @Patch(':id/close')
  async closeOrder(@Param('id') id: string) {
    return this.service.closeOrder(id);
  }

  // Adicione isto no seu OrderController
  @Patch('item/:id/ready')
  async markItemAsReady(@Param('id') id: string) {
    return this.service.markItemAsReady(id);
  }

  @Get(':id/bill')
  async getBill(@Param('id') id: string) {
    return this.service.getFormattedBill(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(id);
  // }
}
EOF

cat <<'EOF' > src/order/order.service.ts
// src/order/order.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { AddItemDto } from './dto/add-item.dto.js';
import { OrderStatus } from '../generated/prisma/enums.js';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar pedido
  async create(dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Criar a comanda (Order)
      const order = await tx.order.create({
        data: {
          table: { connect: { id: dto.tableId } },
          user: { connect: { id: dto.userId } },
          status: 'PENDING',
        },
      });

      // 2. Garantir que a mesa está OCCUPIED (não importa se já estava)
      await tx.table.update({
        where: { id: dto.tableId },
        data: { status: 'OCCUPIED' },
      });

      return order;
    });
  }

  // 2. O MÉTODO QUE ESTAVA FALTANDO (findAll)
  async findAll() {
    return this.prisma.order.findMany({
      include: { 
        table: true, 
        user: { select: { name: true } },
        _count: { select: { items: true } } 
      },
    });
  }

  // 3. Buscar um pedido específico
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { 
        items: { include: { product: true } }, 
        table: true,
        user: { select: { name: true } }
      },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  // 4. Adicionar item (com cálculo de total)
  async addItem(dto: AddItemDto) {
    try {
      console.log('--- Tentativa de Adicionar Item ---');
      console.log('Dados recebidos:', dto);

      const product = await this.prisma.product.findUnique({ 
        where: { id: dto.productId } 
      });

      if (!product) {
        console.error('❌ Produto não encontrado:', dto.productId);
        throw new NotFoundException('Produto não encontrado');
      }

      // Criar o item (sem transaction por enquanto para isolar o erro)
      const newItem = await this.prisma.orderItem.create({
        data: {
          orderId: dto.orderId,
          productId: dto.productId,
          quantity: dto.quantity,
          unitPrice: product.price,
          observation: dto.observation || null,
        },
      });

      console.log('✅ Item criado com sucesso no banco:', newItem.id);

      // Atualizar o total da Order
      const allItems = await this.prisma.orderItem.findMany({
        where: { orderId: dto.orderId }
      });

      const newTotal = allItems.reduce((acc, item) => {
        return acc + (Number(item.unitPrice) * item.quantity);
      }, 0);

      await this.prisma.order.update({
        where: { id: dto.orderId },
        data: { totalPrice: newTotal }
      });

      return { message: 'Item adicionado', item: newItem };
    } catch (error) {
      console.error('❌ ERRO NO PRISMA AO ADICIONAR ITEM:', error);
      throw error;
    }
  }

  // Adicione este método ao seu src/order/order.service.ts
  async finishOrder(id: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fecha a comanda (Order) atual
      const finishedOrder = await tx.order.update({
        where: { id },
        data: { status: 'DELIVERED' },
      });

      // 2. Conta quantas comandas AINDA NÃO FORAM FINALIZADAS nesta mesa específica
      const openOrdersCount = await tx.order.count({
        where: {
          tableId: finishedOrder.tableId,
          status: { 
            notIn: ['DELIVERED', 'CANCELED'] // Se não estiver entregue nem cancelada, está aberta
          },
        },
      });

      // 3. Só libera a mesa se o contador de comandas abertas for ZERO
      if (openOrdersCount === 0) {
        await tx.table.update({
          where: { id: finishedOrder.tableId },
          data: { status: 'FREE' },
        });
      }

      return finishedOrder;
    });
  }

  async getFormattedBill(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } }
    });

    if (!order) return null;

    const summary = order.items.reduce((acc: any, item) => {
      const existing = acc.find((i: any) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        // Certifique-se de que unitPrice seja tratado como número
        existing.subtotal += Number(item.unitPrice) * item.quantity;
      } else {
        acc.push({
          productId: item.productId,
          name: item.product.name,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          subtotal: Number(item.unitPrice) * item.quantity
        });
      }
      return acc;
    }, []);

    return {
      ...order,
      items: summary 
    };
  }

  async findOpenByTable(tableId: string) {
    try {
      // Fazemos a busca de forma mais simples primeiro para testar
      const orders = await this.prisma.order.findMany({
        where: {
          tableId: tableId,
          // Vamos buscar todos os pedidos da mesa que NÃO foram entregues ou cancelados
          NOT: {
            status: { in: ['DELIVERED', 'CANCELED'] }
          }
        },
        include: {
          // Garanta que esses nomes ('items', 'product') sejam IGUAIS ao seu schema.prisma
          items: {
            include: { 
              product: true 
            },
          },
        },
      });

      console.log(`Sucesso! Encontrados ${orders.length} pedidos para a mesa.`);
      return orders;
    } catch (error) {
      // ⚠️ OLHE O TERMINAL DO SEU VS CODE/NESTJS AGORA!
      // Ele vai imprimir o erro real do Prisma aqui:
      console.error("--- ERRO NO PRISMA DETECTADO ---");
      console.error(error.message); 
      
      throw new InternalServerErrorException("Erro interno no servidor ao buscar pedidos.");
    }
  }

  async getTableTotal(tableId: string) {
    const aggregate = await this.prisma.order.aggregate({
      where: {
        tableId: tableId,
        status: { notIn: ['DELIVERED', 'CANCELED'] },
      },
      _sum: {
        totalPrice: true,
      },
    });
    return { total: aggregate._sum.totalPrice || 0 };
  }


  async removeItem(orderItemId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Busca o item para saber de qual pedido ele é antes de deletar
      const item = await tx.orderItem.findUnique({
        where: { id: orderItemId },
      });

      if (!item) throw new NotFoundException('Item não encontrado');

      // 2. Remove o item
      await tx.orderItem.delete({
        where: { id: orderItemId },
      });

      // 3. Recalcula o total dos itens restantes daquela Order
      const remainingItems = await tx.orderItem.findMany({
        where: { orderId: item.orderId },
      });

      const newTotal = remainingItems.reduce((acc, current) => {
        return acc + (Number(current.unitPrice) * current.quantity);
      }, 0);

      // 4. Atualiza o totalPrice da Order
      await tx.order.update({
        where: { id: item.orderId },
        data: { totalPrice: newTotal },
      });

      return { message: 'Item removido e total atualizado', newTotal };
    });
  }


  async getSalesReport() {
    console.log("--- 📊 INICIANDO GERAÇÃO DE RELATÓRIO ---");

    // 1. Pega os totais financeiros
    const stats = await this.prisma.order.aggregate({
      where: { status: 'DELIVERED' },
      _sum: { totalPrice: true },
      _count: { id: true }
    });

    console.log("1. Stats Financeiros:", {
      faturamento: stats._sum.totalPrice,
      totalPedidos: stats._count.id
    });

    // 2. AGRUPAMENTO
    const groupedSales = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: { status: 'DELIVERED' }
      },
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    });

    console.log("2. Resultado do GroupBy (Raw):", JSON.stringify(groupedSales, null, 2));

    // 3. Busca o nome amigável
    const topProducts = await Promise.all(
      groupedSales.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true }
        });

        console.log(`🔎 Traduzindo ID ${item.productId} -> ${product?.name}`);

        return {
          name: product?.name || 'Desconhecido',
          totalSold: item._sum.quantity || 0
        };
      })
    );

    const finalResult = {
      revenue: Number(stats._sum.totalPrice || 0),
      totalOrders: stats._count.id || 0,
      topProducts
    };

    console.log("3. Objeto Final de Retorno:", JSON.stringify(finalResult, null, 2));
    console.log("--- ✅ FIM DO RELATÓRIO ---");

    return finalResult;
  }

  async getKitchenQueue() {
    console.log('--- Iniciando busca na fila da cozinha ---');
    
    // 1. Busca simplificada ao extremo
    const allItems = await this.prisma.orderItem.findMany({
      where: {
        status: 'PENDING', // 👈 Busca itens que ainda não foram feitos
        order: {
          status: { in: ['PENDING', 'PREPARING'] } // Garante que a comanda ainda está aberta
        }
      },
      include: {
        product: true,
        order: {
          include: { table: true } // 👈 Para pegar o número da mesa real
        },
      },
    });

    // 2. Log no terminal do VS Code/NestJS para você ver o que está vindo
    console.log(`Total de itens encontrados no banco: ${allItems.length}`);
    
    // 3. Filtro manual via JavaScript (mais seguro que o do Banco para debug)
    const filtered = allItems.filter(item => 
      item.order.status === 'PENDING' || item.order.status === 'PREPARING'
    );

    console.log(`Itens após filtro PENDING/PREPARING: ${filtered.length}`);

    return allItems.map(item => ({
      id: item.id,
      orderId: item.orderId,
      productName: item.product.name,
      quantity: item.quantity,
      status: item.order.status,
      createdAt: item.createdAt,
      // Se sua mesa tiver o campo 'number', usamos ele, senão o ID
      tableNumber: item.order.table?.number || item.order.tableId 
    }));
  }

  // 🚀 MÉTODO ESSENCIAL: Finaliza o item sem fechar a mesa
  async markItemAsReady(itemId: string) {
    return await this.prisma.orderItem.update({
      where: { id: itemId },
      data: { status: 'READY' } 
    });
  }

  async updateStatus(id: string, status: OrderStatus) { // 👈 Mude de string para OrderStatus
    try {
      return await this.prisma.order.update({
        where: { id },
        data: { status } // Agora o Prisma aceita porque o tipo bate!
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw new BadRequestException('Não foi possível atualizar o status do pedido.');
    }
  }

  async closeOrder(orderId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({ where: { id: orderId } });
        if (!order) throw new NotFoundException('Pedido não encontrado');

        const updatedOrder = await tx.order.update({
          where: { id: orderId },
          data: { status: 'DELIVERED' },
        });

        const openOrders = await tx.order.count({
          where: {
            tableId: order.tableId,
            status: { notIn: ['DELIVERED', 'CANCELED'] }
          }
        });

        if (openOrders === 0) {
          await tx.table.update({
            where: { id: order.tableId },
            data: { status: 'FREE' },
          });
        }
        return updatedOrder;
      });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao fechar conta');
    }
  }
}
EOF



echo "---"
echo "✅ Lógica de relatório preparada!"
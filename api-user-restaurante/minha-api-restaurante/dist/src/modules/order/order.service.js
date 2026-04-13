"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (!userId)
            throw new common_1.UnauthorizedException('Usuário não identificado.');
        console.log(`--- 🚀 CRIANDO NOVO PEDIDO: Mesa ${dto.tableId} ---`);
        try {
            return await this.prisma.$transaction(async (tx) => {
                const table = await tx.table.findUnique({ where: { id: dto.tableId } });
                if (!table)
                    throw new common_1.NotFoundException('Mesa não encontrada.');
                if (table.status !== 'FREE')
                    throw new common_1.BadRequestException('Esta mesa já possui um pedido aberto.');
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
                        if (!product)
                            throw new common_1.NotFoundException(`Produto ${item.productId} não encontrado.`);
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
        }
        catch (error) {
            console.error('🔥 ERRO NA CRIAÇÃO DO PEDIDO:', error.message);
            if (error.status)
                throw error;
            throw new common_1.InternalServerErrorException('Erro ao processar criação do pedido.');
        }
    }
    async addItem(dto) {
        console.log(`--- ➕ ADICIONANDO ITEM: Pedido ${dto.orderId} ---`);
        try {
            const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
            if (!product)
                throw new common_1.NotFoundException('Produto não encontrado.');
            return await this.prisma.$transaction(async (tx) => {
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
                const newTotal = allItems.reduce((acc, item) => {
                    return acc + (Number(item.unitPrice) * item.quantity);
                }, 0);
                await tx.order.update({
                    where: { id: dto.orderId },
                    data: { totalPrice: newTotal },
                });
                return { message: 'Item adicionado com sucesso', item: newItem, currentTotal: newTotal };
            });
        }
        catch (error) {
            console.error('❌ ERRO AO ADICIONAR ITEM:', error.message);
            if (error.status)
                throw error;
            throw new common_1.InternalServerErrorException('Erro ao adicionar item ao pedido.');
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
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } }, table: true, user: { select: { name: true } } },
        });
        if (!order)
            throw new common_1.NotFoundException('Pedido não encontrado.');
        return order;
    }
    async updateStatus(id, status) {
        return this.prisma.order.update({ where: { id }, data: { status } });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map
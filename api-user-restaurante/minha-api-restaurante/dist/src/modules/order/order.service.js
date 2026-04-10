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
const client_1 = require("../../generated/prisma/client");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, tableId) {
        const table = await this.prisma.table.findUnique({ where: { id: tableId } });
        if (!table)
            throw new common_1.NotFoundException('Mesa não encontrada');
        if (table.status !== client_1.TableStatus.FREE)
            throw new common_1.BadRequestException('Mesa ocupada');
        return this.prisma.$transaction(async (tx) => {
            await tx.table.update({ where: { id: tableId }, data: { status: client_1.TableStatus.OCCUPIED } });
            return tx.order.create({ data: { userId, tableId, status: client_1.OrderStatus.PENDING, totalPrice: 0 } });
        });
    }
    async addItem(orderId, productId, quantity, observation) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produto não encontrado');
        return this.prisma.$transaction(async (tx) => {
            await tx.orderItem.create({ data: { orderId, productId, quantity, unitPrice: product.price, observation } });
            const allItems = await tx.orderItem.findMany({ where: { orderId } });
            const newTotal = allItems.reduce((acc, curr) => acc + (Number(curr.unitPrice) * curr.quantity), 0);
            return tx.order.update({ where: { id: orderId }, data: { totalPrice: newTotal } });
        });
    }
    async listPending() {
        return this.prisma.order.findMany({
            where: { status: { in: [client_1.OrderStatus.PENDING, client_1.OrderStatus.PREPARING] } },
            include: { items: { include: { product: true } }, table: true },
            orderBy: { createdAt: 'asc' }
        });
    }
    async updateOrderStatus(id, status) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Pedido não encontrado');
        if (status === client_1.OrderStatus.CLOSED || status === client_1.OrderStatus.CANCELED) {
            return this.prisma.$transaction(async (tx) => {
                await tx.table.update({ where: { id: order.tableId }, data: { status: client_1.TableStatus.FREE } });
                return tx.order.update({ where: { id }, data: { status } });
            });
        }
        return this.prisma.order.update({ where: { id }, data: { status } });
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } }, table: true, user: { select: { name: true } } }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map
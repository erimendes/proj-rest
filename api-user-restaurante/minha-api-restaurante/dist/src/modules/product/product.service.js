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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const categoryExists = await this.prisma.category.findUnique({
            where: { id: data.categoryId }
        });
        if (!categoryExists) {
            throw new common_1.NotFoundException('A categoria informada não existe');
        }
        try {
            return await this.prisma.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    categoryId: data.categoryId,
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Não foi possível criar o produto. Verifique os dados.');
        }
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findByCategory(categoryId) {
        if (!categoryId)
            throw new common_1.BadRequestException('ID da categoria é obrigatório');
        return this.prisma.product.findMany({
            where: { categoryId },
            include: { category: true }
        });
    }
    async update(id, data) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Produto não encontrado');
        if (data.categoryId) {
            const categoryExists = await this.prisma.category.findUnique({
                where: { id: data.categoryId }
            });
            if (!categoryExists)
                throw new common_1.NotFoundException('Nova categoria não encontrada');
        }
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Produto não encontrado para remoção');
        return this.prisma.product.delete({ where: { id } });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map
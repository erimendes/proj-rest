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
exports.TableService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const client_1 = require("../../generated/prisma/client");
let TableService = class TableService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(number) {
        const exists = await this.prisma.table.findUnique({ where: { number } });
        if (exists)
            throw new common_1.ConflictException(`A mesa número ${number} já existe.`);
        return this.prisma.table.create({ data: { number } });
    }
    async findAll() {
        return this.prisma.table.findMany({ orderBy: { number: 'asc' } });
    }
    async findFree() {
        return this.prisma.table.findMany({ where: { status: client_1.TableStatus.FREE } });
    }
    async updateStatus(id, status) {
        const table = await this.prisma.table.findUnique({ where: { id } });
        if (!table)
            throw new common_1.NotFoundException('Mesa não encontrada');
        return this.prisma.table.update({
            where: { id },
            data: { status }
        });
    }
    async remove(id) {
        return this.prisma.table.delete({ where: { id } });
    }
};
exports.TableService = TableService;
exports.TableService = TableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TableService);
//# sourceMappingURL=table.service.js.map
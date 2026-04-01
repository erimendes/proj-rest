var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
let UserService = class UserService {
    prisma;
    userSelect = {
        id: true,
        email: true,
        username: true,
        fullName: true,
        name: true,
        role: true,
        departmentId: true,
        createdAt: true,
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: this.userSelect,
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async create(data) {
        const userExists = await this.findByEmail(data.email);
        if (userExists) {
            throw new ConflictException('E-mail já cadastrado no sistema');
        }
        if (data.departmentId) {
            const dept = await this.prisma.department.findUnique({
                where: { id: data.departmentId },
            });
            if (!dept) {
                throw new NotFoundException(`Departamento com ID ${data.departmentId} não encontrado.`);
            }
        }
        const hashedPassword = await argon2.hash(data.password);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                role: data.role ?? undefined,
            },
            select: this.userSelect,
        });
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map
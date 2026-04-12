// src/user/user.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'; // Adicionado NotFoundException
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  private readonly userSelect = {
    id: true,
    email: true,
    username: true,
    fullName: true,
    name: true,
    role: true,
    departmentId: true,
    createdAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    // 1. Verificar se o e-mail já existe
    const userExists = await this.findByEmail(data.email);
    if (userExists) {
      throw new ConflictException('E-mail já cadastrado no sistema');
    }

    // 2. Verificar se o departamento existe (Para evitar o erro P2003 de Foreign Key)
    if (data.departmentId) {
      const dept = await this.prisma.department.findUnique({
        where: { id: data.departmentId },
      });
      if (!dept) {
        throw new NotFoundException(`Departamento com ID ${data.departmentId} não encontrado.`);
      }
    }

    // 3. Hashear a senha
    const hashedPassword = await argon2.hash(data.password);

    // 4. Criar o usuário (Correção da estrutura do Prisma)
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        // Garante que o role seja o enviado ou o padrão 'USER'
        role: data.role || 'USER', // Defina um padrão aqui caso não venha no DTO
      },
      select: this.userSelect,
    });
  }
}

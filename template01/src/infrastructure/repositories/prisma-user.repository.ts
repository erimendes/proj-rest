// services/identity-service/src/infrastructure/repositories/prisma-user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js'; // Você precisará criar esse service simples
import { User as UserEntity } from '../../domain/entities/user.entity.js';

@Injectable()
export class PrismaUserRepository {
  constructor(private prisma: PrismaService) {}

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: 'hash_da_senha_aqui', // Depois implementaremos o Bcrypt
        role: user.role,
      },
    });
  }
}
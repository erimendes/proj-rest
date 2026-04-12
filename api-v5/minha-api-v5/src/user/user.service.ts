// src/user/user.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { User, Prisma } from "../generated/prisma/client.js";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // Validação básica
    if (!data.password || typeof data.password !== 'string') {
      throw new BadRequestException('Password is required and must be a string');
    }

    // Criptografia
    const hashedPassword = await argon2.hash(data.password);

    // Criação segura
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    // Se houver senha na atualização, também precisa de Hash!
    if (data.password && typeof data.password === 'string') {
      data.password = await argon2.hash(data.password);
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}

import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (userExists) throw new ConflictException('E-mail já cadastrado');

      const hashedPassword = await argon2.hash(data.password);

      return await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
        },
        select: { id: true, email: true, name: true, role: true }
      });
    } catch (error) {
      console.error("❌ ERRO NO PRISMA:", error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.category.create({ data: { name } });
  }

  async findAll() {
    return this.prisma.category.findMany({ include: { products: true } });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }

  async update(id: string, name: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }
}

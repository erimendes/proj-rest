import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const categoryExists = await this.prisma.category.findUnique({ where: { id: data.categoryId } });
    if (!categoryExists) throw new NotFoundException('Categoria não encontrada');
    
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  async update(id: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

}

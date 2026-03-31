// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true }, // Opcional: traz os dados da categoria junto
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { name: { contains: query, mode: 'insensitive' } } }
        ]
      },
      include: {
        category: true // Para mostrar a qual categoria o achado pertence
      }
    });
  }
}
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto'; // Importe seu DTO aqui

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    // Como usamos o ValidationPipe no main.ts e o DTO no Controller, 
    // o 'data' e o 'data.categoryId' já chegam validados aqui.

    // 1. Verificação de Categoria (Regra de Negócio)
    const categoryExists = await this.prisma.category.findUnique({ 
      where: { id: data.categoryId } 
    });
    
    if (!categoryExists) {
      throw new NotFoundException('A categoria informada não existe');
    }
    
    // 2. Criação no banco
    try {
      return await this.prisma.product.create({ 
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
        }
      });
    } catch (error) {
      // Captura erros de banco (ex: violação de constraint)
      throw new BadRequestException('Não foi possível criar o produto. Verifique os dados.');
    }
  }

  async findAll() {
    return this.prisma.product.findMany({ 
      include: { category: true },
      orderBy: { createdAt: 'desc' } // Opcional: produtos mais novos primeiro
    });
  }

  async findByCategory(categoryId: string) {
    if (!categoryId) throw new BadRequestException('ID da categoria é obrigatório');
    
    return this.prisma.product.findMany({ 
      where: { categoryId },
      include: { category: true }
    });
  }

  async update(id: string, data: Partial<CreateProductDto>) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    
    // Se estiver tentando mudar a categoria, valida se a nova existe
    if (data.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({ 
        where: { id: data.categoryId } 
      });
      if (!categoryExists) throw new NotFoundException('Nova categoria não encontrada');
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // É boa prática verificar a existência antes de deletar para dar um 404 claro
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado para remoção');

    return this.prisma.product.delete({ where: { id } });
  }
}
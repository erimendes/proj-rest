import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('O nome da categoria é obrigatório');
    }

    // Usamos findFirst aqui para evitar o erro de tipagem caso o campo 'name' 
    // no schema.prisma ainda não tenha o @unique
    const categoryExists = await this.prisma.category.findFirst({
      where: { name: name.trim() }
    });

    if (categoryExists) {
      throw new ConflictException('Já existe uma categoria com este nome');
    }

    return this.prisma.category.create({ 
      data: { name: name.trim() } 
    });
  }

  async findAll() {
    return this.prisma.category.findMany({ 
      include: { products: true },
      orderBy: { name: 'asc' }
    });
  }

  async update(id: string, name: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Categoria não encontrada');

    if (!name || name.trim().length === 0) {
      throw new BadRequestException('O novo nome da categoria não pode ser vazio');
    }

    return this.prisma.category.update({
      where: { id },
      data: { name: name.trim() },
    });
  }

  async remove(id: string) {
    // Verificamos o ID único
    const category = await this.prisma.category.findUnique({ 
      where: { id },
      include: { 
        _count: { 
          select: { products: true } 
        } 
      } 
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    if (category._count.products > 0) {
      throw new BadRequestException('Não é possível excluir uma categoria que possui produtos vinculados');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
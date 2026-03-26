// src/table/table.service.ts
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTableDto) {
    try {
      return await this.prisma.table.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe uma mesa com este número.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.table.findMany();
  }

  async remove(id: string) {
    // 1. Verificamos se a mesa existe
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException('Mesa não encontrada');

    // 2. Executamos a limpeza total em ordem para não dar erro de chave estrangeira
    return await this.prisma.$transaction(async (tx) => {
      // A. Apaga os itens dos pedidos dessa mesa
      await tx.orderItem.deleteMany({
        where: { order: { tableId: id } }
      });

      // B. Apaga os pedidos dessa mesa
      await tx.order.deleteMany({
        where: { tableId: id }
      });

      // C. Agora sim, apaga a mesa
      return await tx.table.delete({
        where: { id }
      });
    });
  }

  async resetTable(id: string) {
    const table = await this.prisma.table.findUnique({ where: { id } });
    
    if (!table) throw new NotFoundException('Mesa não encontrada');

    return this.prisma.table.update({
      where: { id },
      data: { status: 'FREE' } // Certifique-se que o status no Prisma é 'FREE'
    });
  }
}
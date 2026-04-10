import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TableStatus } from '../../generated/prisma/client';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async create(number: number) {
    const exists = await this.prisma.table.findUnique({ where: { number } });
    if (exists) throw new ConflictException(`A mesa número ${number} já existe.`);
    
    return this.prisma.table.create({ data: { number } });
  }

  async findAll() {
    return this.prisma.table.findMany({ orderBy: { number: 'asc' } });
  }

  async findFree() {
    return this.prisma.table.findMany({ where: { status: TableStatus.FREE } });
  }

  async updateStatus(id: string, status: TableStatus) {
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    
    return this.prisma.table.update({
      where: { id },
      data: { status }
    });
  }

  async remove(id: string) {
    return this.prisma.table.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AtivoStatus, AtivoTipo } from '../../../generated/prisma/enums';

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertAtivo(data: any) {
    // Lógica para sincronizar Ativos usando o número de série como chave única
    return this.prisma.ativo.upsert({
      where: { numSerie: data.numSerie },
      update: {
        hostname: data.hostname,
        status: data.status as AtivoStatus,
        emUso: data.emUso,
        updatedAt: new Date(),
      },
      create: {
        tagPatrimonial: data.tagPatrimonial,
        numSerie: data.numSerie,
        tipo: data.tipo as AtivoTipo,
        fabricante: data.fabricante,
        modelo: data.modelo,
        hostname: data.hostname,
        cpu: data.cpu,
        ram: data.ram,
        discoFisico: data.discoFisico,
      },
    });
  }

  async findByTag(tag: string) {
    return this.prisma.ativo.findUnique({
      where: { tagPatrimonial: tag },
      include: { configRede: true, user: true },
    });
  }
}

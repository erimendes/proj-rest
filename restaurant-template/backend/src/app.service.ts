// backend/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Importe o serviço acima

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {} // Injeção de dependência

  async getHealth() {
    try {
      // Apenas executa uma query simples para validar a saúde
      await this.prisma.$queryRaw`SELECT 1`; 
      return { status: 'OK', database: 'Conectado!' };
    } catch (error) {
      return { 
        status: 'Erro', 
        database: 'Erro ao conectar',
        detail: error.message 
      };
    }
    // SEM $disconnect aqui! O PrismaService cuida disso no shutdown do app.
  }
}
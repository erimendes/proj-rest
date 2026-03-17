// services/identity-service/src/infrastructure/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from "../ ../../../../generated/prisma/client.js";
import { PrismaClient } from "../../../generated/prisma/client.js"; // Ajuste o caminho conforme necessário

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
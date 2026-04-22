#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${PROJECT_NAME:-minha-api-glpi}"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${BLUE}==> $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

log "Iniciando estrutura Enterprise para: $PROJECT_NAME"

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

log "Instalando @nestjs/schedule ..."
npm install @nestjs/schedule

log "Instalando joi e @types/joi ..."
npm install joi && npm install -D @types/joi

log "Instalando @nestjs/axios e axios ..."
npm install @nestjs/axios axios

# Criação de estrutura de pastas
mkdir -p src/config/env \
         src/modules/glpi/interfaces \
         src/modules/glpi/dto \
         src/modules/inventory/dto \
         src/modules/inventory/repositories \
         src/modules/sync/tasks \
         src/database/prisma

#########################################
# 1. CONFIG - Environment & Validation
#########################################
log "Configurando validação de ambiente (Joi)..."

cat <<EOF > src/config/env/validation.schema.ts
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  GLPI_API_URL: Joi.string().uri().required(),
  GLPI_APP_TOKEN: Joi.string().required(),
  GLPI_USER_TOKEN: Joi.string().required(),
});
EOF

cat <<EOF > src/config/env/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  database: { url: process.env.DATABASE_URL },
  glpi: {
    url: process.env.GLPI_API_URL,
    appToken: process.env.GLPI_APP_TOKEN,
    userToken: process.env.GLPI_USER_TOKEN,
  },
}));
EOF

#########################################
# 2. DATABASE - Prisma Service (Ajustado)
#########################################
log "Configurando infraestrutura de banco de dados..."

cat <<EOF > src/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{

  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Conexão com o banco estabelecida.');
    } catch (err) {
      this.logger.error('Falha ao conectar no banco:', err);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
EOF

cat <<EOF > src/database/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
EOF

#########################################
# 3. GLPI - Integration Layer
#########################################
log "Criando integração com GLPI..."

cat <<EOF > src/modules/glpi/glpi.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GlpiService {
  private readonly logger = new Logger(GlpiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async fetchInventory() {
    this.logger.log('Buscando ativos do GLPI...');
    // TODO: Implementar lógica de fetch real conforme o modelo do Ativo
    return []; 
  }
}
EOF

cat <<EOF > src/modules/glpi/glpi.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GlpiService } from './glpi.service';

@Module({
  imports: [HttpModule],
  providers: [GlpiService],
  exports: [GlpiService],
})
export class GlpiModule {}
EOF

#########################################
# 4. INVENTORY - Repository (Ajustado ao Novo Schema)
#########################################
log "Configurando domínio de Inventário (Ativos)..."

cat <<EOF > src/modules/inventory/repositories/inventory.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AtivoStatus, AtivoTipo } from '../../../generated/prisma';

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
      include: { configRede: true, usuario: true },
    });
  }
}
EOF

cat <<EOF > src/modules/inventory/inventory.service.ts
import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './repositories/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async syncBatch(items: any[]) {
    for (const item of items) {
      await this.repository.upsertAtivo(item);
    }
  }
}
EOF

cat <<EOF > src/modules/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryRepository } from './repositories/inventory.repository';

@Module({
  providers: [InventoryService, InventoryRepository],
  exports: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
EOF

#########################################
# 5. SYNC - Tasks
#########################################
log "Configurando orquestrador de sincronização..."

cat <<EOF > src/modules/sync/tasks/inventory-sync.task.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GlpiService } from '../../glpi/glpi.service';
import { InventoryService } from '../../inventory/inventory.service';

@Injectable()
export class InventorySyncTask {
  private readonly logger = new Logger(InventorySyncTask.name);

  constructor(
    private readonly glpiService: GlpiService,
    private readonly inventoryService: InventoryService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleSync() {
    this.logger.log('--- Iniciando Sincronização Automática ---');
    const data = await this.glpiService.fetchInventory();
    await this.inventoryService.syncBatch(data);
    this.logger.log('--- Sincronização Finalizada ---');
  }
}
EOF

cat <<EOF > src/modules/sync/sync.module.ts
import { Module } from '@nestjs/common';
import { GlpiModule } from '../glpi/glpi.module';
import { InventoryModule } from '../inventory/inventory.module';
import { InventorySyncTask } from './tasks/inventory-sync.task';

@Module({
  imports: [GlpiModule, InventoryModule],
  providers: [InventorySyncTask],
})
export class SyncModule {}
EOF

#########################################
# 6. APP MODULE
#########################################
log "Finalizando AppModule..."

cat <<EOF > src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/env/configuration';
import { validationSchema } from './config/env/validation.schema';
import { PrismaModule } from './database/prisma.module';
import { SyncModule } from './modules/sync/sync.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    InventoryModule,
    SyncModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
EOF

echo -e "\n${GREEN}✅ ESTRUTURA ATUALIZADA PARA O NOVO SCHEMA!${NC}"
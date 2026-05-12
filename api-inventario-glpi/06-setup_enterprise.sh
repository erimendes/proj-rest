#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-glpi"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}==> $1${NC}"; }

log "Criando estrutura do projeto..."

# Garantir que o projeto existe
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Criar diretórios
mkdir -p src/config/env \
         src/modules/glpi/interfaces \
         src/modules/glpi/dto \
         src/modules/inventory/dto \
         src/modules/inventory/entities \
         src/modules/inventory/repositories \
         src/modules/sync/tasks \
         src/modules/sync/listeners \
         src/providers/logger \
         src/providers/http \
         src/database

# 1. CONFIG - Environment Validation (Joi)
log "Criando configuração de ambiente..."

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
export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  glpi: {
    url: process.env.GLPI_API_URL,
    appToken: process.env.GLPI_APP_TOKEN,
    userToken: process.env.GLPI_USER_TOKEN,
  },
});
EOF

# 2. GLPI - Integration Layer
log "Criando módulo GLPI..."

cat <<EOF > src/modules/glpi/glpi.constants.ts
export const GLPI_CONFIG = 'GLPI_CONFIG';
EOF

cat <<EOF > src/modules/glpi/glpi.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlpiService {
  private readonly logger = new Logger(GlpiService.name);

  constructor(private readonly configService: ConfigService) {}

  async getSessionToken() {
    this.logger.log('Obtendo session token do GLPI...');
    // TODO: implementar autenticação real
    return null;
  }

  async fetchInventory() {
    this.logger.log('Buscando dados do GLPI...');
    // TODO: chamada HTTP real
    return [];
  }
}
EOF

cat <<EOF > src/modules/glpi/glpi.module.ts
import { Module } from '@nestjs/common';
import { GlpiService } from './glpi.service';

@Module({
  providers: [GlpiService],
  exports: [GlpiService],
})
export class GlpiModule {}
EOF

# 3. INVENTORY - Repository Pattern
log "Criando módulo Inventory..."

cat <<EOF > src/modules/inventory/repositories/inventory.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertDevice(data: any) {
    // TODO: implementar lógica real
    return this.prisma.user.updateMany({
      where: {},
      data: {},
    });
  }
}
EOF

cat <<EOF > src/modules/inventory/inventory.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  // TODO: implementar regras de negócio
}
EOF

cat <<EOF > src/modules/inventory/inventory.controller.ts
import { Controller } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {}
EOF

cat <<EOF > src/modules/inventory/inventory.module.ts
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './repositories/inventory.repository';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
EOF

# 4. SYNC - Tasks (Schedule)
log "Criando tarefas de sincronização..."

cat <<EOF > src/modules/sync/tasks/inventory-sync.task.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GlpiService } from '../../glpi/glpi.service';

@Injectable()
export class InventorySyncTask {
  private readonly logger = new Logger(InventorySyncTask.name);

  constructor(private readonly glpiService: GlpiService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleSync() {
    this.logger.debug('Iniciando sincronização automática...');
    await this.glpiService.fetchInventory();
  }
}
EOF

# 5. PROVIDERS - HTTP
log "Criando HTTP client..."

cat <<EOF > src/providers/http/http-client.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly http: HttpService) {}

  // TODO: implementar retry / interceptors
}
EOF

# 6. DATABASE - Prisma Service (placeholder)
log "Criando PrismaService (placeholder)..."

cat <<EOF > src/database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // TODO: conectar ao banco
  }

  async onModuleDestroy() {
    // TODO: desconectar
  }
}
EOF

# Permissão de execução correta
chmod +x setup_enterprise.sh

echo -e "${GREEN}✅ Estrutura enterprise criada com sucesso!${NC}"
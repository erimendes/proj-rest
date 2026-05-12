#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-user"

# Cores e Estilos
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${GREEN}==> $1${NC}"; }

echo -e "${BLUE}🚀 INICIANDO SETUP: $PROJECT_NAME${NC}"

# 1. Criação do Projeto
npx @nestjs/cli@latest new "$PROJECT_NAME" --package-manager npm --skip-git
cd "$PROJECT_NAME"

# 2. Instalação de Dependências
log "Instalando dependências principais..."
npm install @nestjs/config @nestjs/jwt @nestjs/passport class-validator class-transformer passport passport-jwt bcrypt argon2
npm install -D @types/passport-jwt @types/bcrypt ts-node

log "Instalando Prisma e drivers..."
npm install @prisma/client pg
npm install -D prisma @types/pg

log "Instalando npm i @prisma/adapter-pg para compatibilidade com Prisma Client v5..."
npm install -D @prisma/adapter-pg

log "Instalando Swagger..."
npm install @nestjs/swagger swagger-ui-express

log "Iniciando Prisma..."
npx prisma init --datasource-provider postgresql

#########################################
# 📄 Configuração do .env
#########################################
log "📄 Configurando .env..."
cat << 'EOF' > .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_MAIN_DATABASE=postgres
NEW_PROJECT_DB=minha_api_user

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minha_api_user?schema=public"
JWT_SECRET="super-secret"
EOF

#########################################
# 🛠️ Script para criar banco se não existir
#########################################
log "📁 Criando script para criação de banco em src/scripts..."
mkdir -p src/scripts
cat << 'EOF' > src/scripts/sync-criar-banco.ts
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function ensureDatabaseExists() {
  const dbName = process.env.NEW_PROJECT_DB;
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('Conectado ao Postgres para verificar bancos...');
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Sucesso: Banco "${dbName}" criado!`);
    } else {
      console.log(`ℹ️ O banco "${dbName}" já existe.`);
    }
  } catch (err: any) {
    console.error("❌ Erro ao criar banco:", err.message);
  } finally {
    await client.end();
  }
}

ensureDatabaseExists();
EOF

# Adiciona script no package.json
sed -i 's/"scripts": {/"scripts": {\n    "db:create": "ts-node src\/scripts\/sync-criar-banco.ts",/' package.json
# Inserção do script no package.json
# npx json -I -f package.json -e 'this.scripts["db:create"]="ts-node src/scripts/sync-criar-banco.ts"'


#########################################
# 💎 Prisma schema
#########################################
log "💎 Criando schema Prisma..."
mkdir -p prisma
cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}

// --- MÓDULO DE USUÁRIOS ---
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String
  name         String?
  role         Role      @default(USER)
  departamento String?
  sessions     Session[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// --- MÓDULO DE SESSÕES ---
model Session {
  id           Int      @id @default(autoincrement())
  userId       String   @unique
  user         User     @relation(fields: [userId], references: [id])
  refreshToken String
  userAgent    String?
  ip           String?
  createdAt    DateTime @default(now())
  expiresAt    DateTime
  revoked      Boolean  @default(false)
}

// --- ENUMS PARA PADRONIZAÇÃO ---

enum Role {
  USER
  ADMIN
}
EOF

#########################################
# 🧱 Database Module
#########################################
mkdir -p src/database
cat << 'EOF' > src/database/prisma.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
EOF

cat << 'EOF' > src/database/prisma.module.ts
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
# 🚀 main.ts
#########################################
cat << 'EOF' > src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('API Moderna NestJS')
    .setDescription('Arquitetura Moderna com Auto-DB Create')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
EOF

# Ajuste do nest-cli.json para incluir assets gerados
cat << 'EOF' > nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "assets": [
      { "include": "generated/**/*", "watchAssets": true }
    ]
  }
}
EOF

# Ajuste do tsconfig.json para suportar paths e módulos ES2023
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}
EOF

# Ajuste do prisma.config.js para usar dotenv e env()
echo "ajustando prisma.config.js para usar dotenv e env()..."
cat << 'EOF' > prisma.config.js
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
EOF

# 6. Finalização
log "⚙️ Executando criação de banco..."
npm run db:create
log "✅ Ambiente pronto! Execute 'npm run start:dev' para começar."
echo -e "\n${BLUE}✅ TUDO PRONTO!${NC}"
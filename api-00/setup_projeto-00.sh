#!/bin/bash
set -e

PROJECT_NAME="minha-api-rest"

echo "🚀 Criando projeto NestJS..."
npx @nestjs/cli new $PROJECT_NAME --package-manager npm --skip-git

cd $PROJECT_NAME

echo "📦 Instalando dependências..."
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt argon2 class-validator class-transformer
npm install @prisma/client
npm install -D prisma

npm install prisma@latest @prisma/client@latest

npm install @prisma/adapter-pg pg
npm install -D @types/pg
echo "📦 Instalando Swagger"
npm install @nestjs/swagger swagger-ui-express

echo "💎 Configurando Prisma"
npx prisma init --datasource-provider postgresql

cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
}
EOF

echo "📄 Ajustando .env"
cat << 'EOF' > .env
# Dados de conexão para o script de criação (conecta no banco 'postgres')
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_MAIN_DATABASE=postgres

# O nome do banco que você quer criar dinamicamente
NEW_PROJECT_DB=it_asset_manager

# URL que o Prisma usará (após o banco ser criado)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/it_asset_manager?schema=public"
JWT_SECRET="super-secret"
EOF

echo "📦 Prisma generate"
npx prisma generate

echo "📁 Criando PrismaModule"
mkdir -p src/prisma

cat << 'EOF' > src/prisma/prisma.service.ts
// src/prisma/prisma.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client.js";
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

cat << 'EOF' > src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
EOF

echo "📁 Criando módulo USER"
npx nest g res user --no-spec --no-flat

echo "📄 Criando DTOs"
cat << 'EOF' > src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'João', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
EOF

cat << 'EOF' > src/user/dto/update-user.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
EOF

echo "📄 Criando user.dto.ts'"
cat << 'EOF' > src/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'Nome do Usuário', required: false })
  name?: string;

  @ApiProperty({ example: 'USER' })
  role: string;

  @ApiProperty({ example: '2026-03-31T10:00:00.000Z' })
  createdAt: Date;
}
EOF

echo "🔧 Ajustando UserService"
cat << 'EOF' > src/user/user.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import * as argon2 from 'argon2'
import { CreateUserDto } from './dto/create-user.dto.js'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany()
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await argon2.hash(data.password)

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    })
  }
}
EOF

echo "🔧 Ajustando UserController"
cat << 'EOF' > src/user/user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'
import { UserService } from './user.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UserDto } from './dto/user.dto.js'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiOkResponse({ type: [UserDto] })
  findAll() {
    return this.service.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiCreatedResponse({ type: UserDto }) // 👈 Swagger agora mostra exemplo
  create(@Body() body: CreateUserDto) {
    return this.service.create(body)
  }
}
EOF

echo "🔧 Ajustando AppModule"
cat << 'EOF' > src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module.js'
import { UserModule } from './user/user.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
EOF

cat << 'EOF' > src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js'; 

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
EOF

cat << 'EOF' > src/main.ts 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando Swagger
  const config = new DocumentBuilder()
    .setTitle('Minha API REST')
    .setDescription('API exemplo com NestJS, Prisma e Swagger')
    .setVersion('1.0')
    .addBearerAuth() // caso queira JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
EOF

cat << 'EOF' > src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
EOF
# Criando sync-criar-banco.ts
echo "📁 Criando script para criar banco dinamicamente"
mkdir -p scripts
cat << 'EOF' > scripts/sync-criar-banco.ts
// src/scripts/sync-criar-banco.ts
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
    database: 'postgres', // Conecta obrigatoriamente no banco padrão
  });

  try {
    await client.connect();
    console.log('Conectado ao Postgres para verificar bancos...');

    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (res.rowCount === 0) {
      // Usamos aspas duplas para evitar erro com nomes que tenham hífen ou números
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Sucesso: Banco "${dbName}" criado!`);
    } else {
      console.log(`ℹ️ O banco "${dbName}" já existe.`);
    }
  } catch (err) {
    console.error("❌ Erro ao criar banco:", err.message);
  } finally {
    await client.end();
  }
}

// ESTA LINHA É ESSENCIAL: Chama a função que você definiu acima
ensureDatabaseExists();
EOF

echo "⚡ Criando banco dinamicamente"
npx ts-node scripts/sync-criar-banco.ts

echo "⚡ Configurando projeto como ESM"
npm pkg set type="module"

echo "🧹 Limpando banco de dados"
npx prisma migrate reset --force --skip-seed --skip-generate

echo "🚀 Rodando migrate"
npx prisma migrate dev --name init

echo "✅ Projeto pronto!"
echo "A documentação ficará acessível em: http://localhost:3000/api"
echo "👉 npm run start:dev"
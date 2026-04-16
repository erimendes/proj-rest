#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"

log() {
  echo -e "\033[1;32m$1\033[0m"
}

log "🚀 Iniciando projeto NestJS Profissional..."
npx @nestjs/cli@latest new "$PROJECT_NAME" --package-manager npm --skip-git

cd "$PROJECT_NAME"

#########################################
# 📦 Instalação de Dependências
#########################################
log "📦 Instalando pacotes (Core, Prisma, Auth, DB Utils)..."
npm install \
  @nestjs/config \
  @nestjs/swagger \
  @nestjs/jwt \
  @nestjs/passport \
  swagger-ui-express \
  class-validator \
  class-transformer \
  passport \
  passport-jwt \
  bcrypt \
  @prisma/client \
  pg \
  dotenv \
  @prisma/adapter-pg

npm install -D prisma ts-node @types/pg @types/node @types/passport-jwt @types/bcrypt

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
NEW_PROJECT_DB=minha_api_rest

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minha_api_rest?schema=public"
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
// ==========================================
// 1. INVENTÁRIO DE HARDWARE (Ativos e Servidores)
// ==========================================

model Ativo {
  id              Int           @id @default(autoincrement())
  tagPatrimonial  String        @unique
  tipo            AtivoTipo     @default(LAPTOP)
  fabricante      String
  modelo          String
  numSerie        String        @unique
  hostname        String?       @unique
 
  // Especificações técnicas (Baseado na sua lista)
  cpu             String?
  ram             String?
  discoFisico     String?
  status          AtivoStatus   @default(DISPONIVEL)
  emUso           Boolean       @default(true)
  dataCompra      DateTime?
  valor           Decimal?      @db.Decimal(10, 2)

  // Virtualização (Hyper-V / VMware)
  isVirtualizado  Boolean       @default(false)
  hyperVName      String?       // Nome da VM no Hyper-V
  hostFisicoId    Int?          // Se for VM, aponta para o ID do servidor físico
  vms             Ativo[]       @relation("HostVms")
  host            Ativo?        @relation("HostVms", fields: [hostFisicoId], references: [id])

  // Relacionamentos
  usuarioId       Int?
  usuario         Usuario?      @relation(fields: [usuarioId], references: [id])
  configRede      ConfigRede?
  licencas        LicencaAtivo[]
  aplicacoes      Aplicacao[]   @relation("AppServidores")

  observacoes     String?       @db.Text
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

// ==========================================
// 2. INVENTÁRIO DE SISTEMAS (Sua imagem do Excel)
// ==========================================

model Aplicacao {
  id                Int              @id @default(autoincrement())
  nome              String
  sigla             String?          @unique
  descricao         String?          @db.Text
  categoria         SistemaCategoria @default(OPERACIONAL)
  criticidade       Criticidade      @default(MEDIA)
 
  // Gestão de Negócio (Campos da imagem)
  businessOwner     String?          // Área Usuária
  responsavelTecnico String?         // Responsável STI
  contatoFuncional  String?
  fornecedor        String?
 
  // Resiliência e Operação
  janelaOperacao    String?          // Ex: 24/7
  backupInfo        String?          // Existe/Onde
  procedimentoRecup String?          @db.Text
  pontoUnicoFalha   String?          @db.Text

  // Stack Tecnológica
  tecnologiaPrincipal String?        // Stack
  databaseInfo        String?        // Tipo/SGBD e Versão
  integracoes         String?        @db.Text

  // Relacionamento: Onde a aplicação está hospedada
  servidores        Ativo[]          @relation("AppServidores")
}

// ==========================================
// 3. INFRAESTRUTURA DE REDE
// ==========================================

model ConfigRede {
  id             Int     @id @default(autoincrement())
  ipAddress      String?
  macAddress     String  @unique
  vlan           Int?
  portasUTP      Int?
  portasFibra    Int?
  storageConect  String? // Nome do Storage/LUN
  discoStorage   String? // Tamanho alocado no Storage
 
  ativo          Ativo   @relation(fields: [ativoId], references: [id])
  ativoId        Int     @unique
}

// ==========================================
// 4. SOFTWARE E LICENCIAMENTO
// ==========================================

model Software {
  id          Int       @id @default(autoincrement())
  nome        String
  versao      String?
  fabricante  String
  licencas    Licenca[]
}

model Licenca {
  id             Int            @id @default(autoincrement())
  chaveAtivacao  String         @unique
  dataExpiracao  DateTime?
  software       Software       @relation(fields: [softwareId], references: [id])
  softwareId     Int
  instacoes      LicencaAtivo[]
}

model LicencaAtivo {
  id        Int      @id @default(autoincrement())
  ativo     Ativo    @relation(fields: [ativoId], references: [id])
  ativoId   Int
  licenca   Licenca  @relation(fields: [licencaId], references: [id])
  licencaId Int
  dataInstalacao DateTime @default(now())

  @@unique([ativoId, licencaId])
}

// ==========================================
// 5. PESSOAL E CUSTÓDIA
// ==========================================
// --- MÓDULO DE USUÁRIOS ---
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String
  name         String?
  role         Role      @default(USER)
  departamento String?
  ativos       Ativo[] 
  sessions     Session[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// --- MÓDULO DE SESSÕES ---
model Session {
  id           String   @id @default(uuid())
  refreshToken String
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userAgent    String?
  ip           String?
  revoked      Boolean  @default(false)
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}

// --- ENUMS PARA PADRONIZAÇÃO ---

enum Role {
  USER
  ADMIN
}

enum AtivoTipo {
  LAPTOP
  DESKTOP
  SERVIDOR_FISICO
  SERVIDOR_VIRTUAL
  SWITCH
  ROTEADOR
  STORAGE
  MONITOR
}

enum AtivoStatus {
  DISPONIVEL
  EM_USO
  MANUTENCAO
  DESCARTADO
}

enum SistemaCategoria {
  ADMINISTRATIVO
  OPERACIONAL
}

enum Criticidade {
  BAIXA
  MEDIA
  ALTA
  CRITICA
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
# 👤 User Module
#########################################
mkdir -p src/modules/user/dto
cat << 'EOF' > src/modules/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Importe o Enum do Prisma para garantir que as opções sejam idênticas
import { Role } from '../../../generated/prisma/client'; 

export class CreateUserDto {
  @ApiProperty({ example: 'teste01@teste.com' }) 
  @IsEmail() 
  email!: string;

  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password!: string;

  @ApiProperty({ example: 'João Silva' })
  @IsOptional() 
  @IsString() 
  name?: string;

  // ADICIONE ESTE CAMPO:
  @ApiProperty({ 
    enum: Role, 
    example: 'ADMIN',
    description: 'Nível de acesso do usuário' 
  })
  @IsOptional() // Ou @IsNotEmpty() se quiser obrigar a escolha
  @IsEnum(Role, { message: 'A role deve ser um dos valores: USER, ADMIN, MANAGER, WAITER, CHEF' })
  role?: Role;
}
EOF

cat << 'EOF' > src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });
  }
}
EOF

cat << 'EOF' > src/modules/user/user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() create(@Body() createUserDto: CreateUserDto) { return this.userService.create(createUserDto); }
  @Get() findAll() { return this.userService.findAll(); }
}
EOF

cat << 'EOF' > src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
EOF

#########################################
# 🔐 Auth Module
#########################################
mkdir -p src/modules/auth
cat << 'EOF' > src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
EOF

#########################################
# 🏗️ AppModule
#########################################
cat << 'EOF' > src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
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
    "paths": {
      "@/*": ["./src/*"]
    },
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


#########################################
# 🔧 Prisma Migrations & Client
#########################################
log "⚙️ Criando banco e gerando Prisma Client..."
npm run db:create
npx prisma migrate dev --name init
npx prisma generate

log "✅ Script concluído com sucesso!"
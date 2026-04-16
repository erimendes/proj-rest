#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-user"

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

enum Role {
  USER
  ADMIN
  MANAGER
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
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@generated/*": ["src/generated/*"]
    },
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
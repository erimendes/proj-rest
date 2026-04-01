#!/bin/bash
set -e

PROJECT_NAME="minha-api-rest"

cd $PROJECT_NAME

echo "📝 Criando arquivo prisma/schema.prisma com o schema completo..."

mkdir -p prisma

cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- TABELAS DE NÚCLEO ---

model Asset {
  id             Int          @id @default(autoincrement())
  hostname       String?      @unique
  serialNumber   String       @unique @map("serial_number")
  assetTag       String?      @unique @map("asset_tag")
  purchaseDate   DateTime?    @map("purchase_date")
  warrantyExpiry DateTime?    @map("warranty_expiry")
  
  // Relacionamentos
  status         Status       @relation(fields: [statusId], references: [id])
  statusId       Int          @map("status_id")
  
  model          Model        @relation(fields: [modelId], references: [id])
  modelId        Int          @map("model_id")

  location       Location?    @relation(fields: [locationId], references: [id])
  locationId     Int?         @map("location_id")

  assignments    Assignment[]
  
  createdAt      DateTime     @default(now()) @map("created_at")
  updatedAt      DateTime     @updatedAt @map("updated_at")

  @@map("assets")
}

enum Role {
  USER
  ADMIN
}

model User {
  id           Int          @id @default(autoincrement())
  username     String       @unique // Login do AD (Ex: joao.silva)
  fullName     String       @map("full_name")
  email        String       @unique
  
  password  String
  name      String?
  role      Role     @default(USER)
  
  department   Department   @relation(fields: [departmentId], references: [id])
  departmentId Int          @map("department_id")

  assignments  Assignment[]

  createdAt    DateTime     @default(now()) @map("created_at")
  @@map("users")
}

// --- GESTÃO DE MOVIMENTAÇÃO (HISTÓRICO) ---

model Assignment {
  id         Int       @id @default(autoincrement())
  asset      Asset     @relation(fields: [assetId], references: [id])
  assetId    Int       @map("asset_id")
  user       User      @relation(fields: [userId], references: [id])
  userId     Int       @map("user_id")
  
  assignedAt DateTime  @default(now()) @map("assigned_at")
  returnedAt DateTime? @map("returned_at")

  @@map("assignments")
}

// --- TABELAS DE APOIO (AUXILIARES) ---

model Model {
  id           Int     @id @default(autoincrement())
  name         String  // Ex: Latitude 3420
  manufacturer String  // Ex: Dell
  category     String  // Ex: Notebook, Desktop, Monitor
  assets       Asset[]

  @@map("models")
}

model Status {
  id     Int     @id @default(autoincrement())
  name   String  // Ex: Em Uso, Estoque, Manutenção, Descartado
  assets Asset[]

  @@map("status")
}

model Department {
  id    Int    @id @default(autoincrement())
  name  String @unique // Ex: TI, Financeiro, RH
  users User[]

  @@map("departments")
}

model Location {
  id     Int     @id @default(autoincrement())
  name   String  // Ex: Matriz - Sala 202
  assets Asset[]

  @@map("locations")
}
EOF

echo "🔧 Ajustando UserService para refletir o novo schema..."
cat << 'EOF' > src/user/user.service.ts
// src/user/user.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'; // Adicionado NotFoundException
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  private readonly userSelect = {
    id: true,
    email: true,
    username: true,
    fullName: true,
    name: true,
    role: true,
    departmentId: true,
    createdAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    // 1. Verificar se o e-mail já existe
    const userExists = await this.findByEmail(data.email);
    if (userExists) {
      throw new ConflictException('E-mail já cadastrado no sistema');
    }

    // 2. Verificar se o departamento existe (Para evitar o erro P2003 de Foreign Key)
    if (data.departmentId) {
      const dept = await this.prisma.department.findUnique({
        where: { id: data.departmentId },
      });
      if (!dept) {
        throw new NotFoundException(`Departamento com ID ${data.departmentId} não encontrado.`);
      }
    }

    // 3. Hashear a senha
    const hashedPassword = await argon2.hash(data.password);

    // 4. Criar o usuário (Correção da estrutura do Prisma)
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role ?? undefined,
      },
      select: this.userSelect,
    });
  }
}
EOF

echo "🔧 Ajustando CreateUserDto para refletir o novo schema..."
cat << 'EOF' > src/user/dto/create-user.dto.ts
// src/user/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
// Importe o Role do Prisma (ajuste o caminho conforme sua estrutura)
import { Role } from '../../generated/prisma/client.js'; 

export class CreateUserDto {
  @ApiProperty({ example: 'joao.silva' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;

  @ApiProperty({ example: 'João' })
  @IsString()
  @IsOptional()
  name?: string;

  // ESTA É A PARTE QUE CORRIGE O SWAGGER
  @ApiPropertyOptional({ 
    enum: Role, 
    example: Role.USER,
    description: 'Nível de permissão do usuário' 
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
EOF

echo "🔧 Ajustando nest-cli.json para incluir o plugin do Swagger..."
cat << 'EOF' > nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": ["@nestjs/swagger"] 
  }
}
EOF

echo "🔧 Criando JwtStrategy para autenticação JWT..."
cat << 'EOF' > src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // O 'jwt' aqui é opcional, pois é o padrão
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUA_CHAVE_SECRETA',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
EOF

echo "🔧 Criando UpdateUserDto como PartialType de CreateUserDto..."
cat << 'EOF' > src/user/dto/update-user.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
EOF

echo "🔧 Ajustando AuthModule para incluir o JwtStrategy..."
cat << 'EOF' > src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    forwardRef(() => UserModule), // ✅ Mantenha apenas este
    // UserModule, <--- ❌ REMOVA ESTA LINHA, ela está anulando o forwardRef
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService] // Dica: Exportar se o UserModule precisar do AuthService
})
export class AuthModule {}
EOF

echo "🔧 Atualizando UserModule para incluir o AuthModule..."
cat << 'EOF' > src/user/user.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    forwardRef(() => AuthModule), // ✅ Correto
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}
EOF

echo "🔧 Criando PrismaService para conectar ao banco de dados usando o adapter do PostgreSQL..."
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

echo "🔧 Criando RegisterDto..."
cat << 'EOF' > src/auth/dto/register.dto.ts
// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'joao.silva', description: 'Nome de usuário único' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @ApiProperty({ example: 'Senha@123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 1, description: 'ID do departamento' })
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty({ example: 'João', required: false, nullable: true })
  @IsOptional()
  @IsString()
  name?: string | null; // Aceita null para bater com o Prisma
}
EOF

echo "🔧 Ajustando AuthController..."
cat << 'EOF' > src/auth/auth.controller.ts
// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@ApiTags('auth') // Agrupa as rotas na interface do Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Use readonly por padrão para serviços

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Garante o status 201 explicitamente
  @ApiOperation({ summary: 'Realizar cadastro de novo usuário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso.' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos ou e-mail já em uso.' 
  })
  async register(@Body() registerDto: RegisterDto) {
    // Note que mudamos de 'body' para 'registerDto' para clareza
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Login deve retornar 200 OK, não 201 Created
  @ApiOperation({ summary: 'Autenticar usuário e retornar Token JWT' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso.' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas.' 
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
EOF

echo "🔧 Ajustando Main..."
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

echo "🔧 Ajustando UserController..."
cat << 'EOF' > src/user/user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { UserService } from './user.service.js'
import { UserDto } from './dto/user.dto.js'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiOkResponse({ type: [UserDto] })
  findAll() {
    return this.service.findAll()
  }
}
EOF

echo "🔧 Criando UserDto para documentação do Swagger..."
cat << 'EOF' > src/user/dto/user.dto.ts
// src/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/browser.js';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'joao.silva' })
  username: string;

  @ApiProperty({ example: 'João Silva' })
  fullName: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'João', required: false, nullable: true })
  name: string | null; // 🔥 IMPORTANTE: Use 'null' para bater com o Prisma

  @ApiProperty({ example: 1 })
  departmentId: number;

  @ApiProperty({ example: '2026-03-31T22:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;
}
EOF

echo "🔧 Criando seed de departamentos..." 
cat << 'EOF' > prisma/seed.ts
// prisma/seed.ts
import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js"; // Ajuste conforme seu caminho de saída

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de Departamentos...');

  // 1. Criar o departamento de TI
  const tiDept = await prisma.department.upsert({
    where: { name: "Tecnologia da Informação" },
    update: {},
    create: {
      id: 1, // Forçamos o ID 1 para bater com seus testes
      name: "Tecnologia da Informação",
    },
  });

  // 2. Criar o departamento de RH (Opcional, para teste)
  const rhDept = await prisma.department.upsert({
    where: { name: "Recursos Humanos" },
    update: {},
    create: {
      id: 2,
      name: "Recursos Humanos",
    },
  });

  console.log('✅ Departamentos garantidos:', { tiDept, rhDept });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
EOF

echo "🔧 Criando prisma.config.ts para configurar o Prisma Client..."
cat << 'EOF' > prisma/prisma.config.ts
// prisma/prisma.config.ts
// This file was generated by Prisma, and assumes you have installed the following:
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
EOF

echo "🔧 Gerando Prisma Client..."
npx prisma generate
echo "🔧 Rodando seed para garantir que o departamento de TI exista...  "
echo "npx prisma db seed"

echo "✅ Prisma schema configurado e client gerado com sucesso."
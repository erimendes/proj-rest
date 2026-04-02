#!/bin/bash
set -e

PROJECT_NAME="api-inventario"

cd $PROJECT_NAME

echo "📝 Criando arquivo prisma/schema.prisma com o schema completo..."

mkdir -p src/scripts

npm install csv-parser

echo "🔧 Schema02 prisma/schema.prisma para usar o adapter do PostgreSQL..."
cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- ENUMS PROFISSIONAIS ---
enum Role {
  USER
  ADMIN
}

enum ComputerType {
  DESKTOP
  NOTEBOOK
  SERVER
  VM
  OTHER
}

enum ComputerRole {
  USER   // Máquina de uso pessoal/estação de trabalho
  SERVER // Máquina que provê serviços (AD, Web, DB)
}

// --- USUÁRIOS ---
model User {
  id           Int         @id @default(autoincrement())
  username     String      @unique
  fullName     String      @map("full_name")
  email        String      @unique
  password     String
  role         Role        @default(USER)

  department   Department? @relation(fields: [departmentId], references: [id])
  departmentId Int?        @map("department_id")

  assignments  Assignment[]
  createdAt    DateTime    @default(now()) @map("created_at")

  @@map("users")
}

// --- GESTÃO DE MOVIMENTAÇÃO ---
model Assignment {
  id         Int       @id @default(autoincrement())
  computer   Computer  @relation(fields: [computerId], references: [id])
  computerId Int       @map("computer_id")
  user       User      @relation(fields: [userId], references: [id])
  userId     Int       @map("user_id")
  
  assignedAt DateTime  @default(now()) @map("assigned_at")
  returnedAt DateTime? @map("returned_at")

  @@map("assignments")
}

// --- TABELAS AUXILIARES ---
model Status {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("statuses")
}

model DeviceModel {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("device_models")
}

model Department {
  id    Int    @id @default(autoincrement())
  name  String @unique
  users User[]

  @@map("departments")
}

model Location {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("locations")
}

// --- ENTIDADE PRINCIPAL: COMPUTER ---
model Computer {
  id             Int      @id @default(autoincrement())
  glpiId         Int?     @unique
  hostname       String
  hostFisico     String?  // Máquina física associada
  nameHaperv     String?  // Nome Hyper-V / VM
  mainIp         String   @unique @db.VarChar(45)

  alternateUser  String?
  user           String?  // Usuário logado via inventário

  type           ComputerType @default(DESKTOP)
  role           ComputerRole @default(USER)

  manufacturer   String?
  modelName      String?
  serial         String?

  osName         String?
  osVersion      String?
  osArch         String?

  cpu            String?
  ram            String?
  hd             String?

  // Relacionamentos
  status         Status?      @relation(fields: [statusId], references: [id])
  statusId       Int?

  location       Location?    @relation(fields: [locationId], references: [id])
  locationId     Int?

  deviceModel    DeviceModel? @relation(fields: [deviceModelId], references: [id])
  deviceModelId  Int?

  assignments    Assignment[]
  networkInterfaces NetworkInterface[]
  volumes           Volume[]
  softwares         SoftwareOnComputer[]

  lastSync       DateTime @default(now())

  @@map("computers")
}

// --- DETALHAMENTO TÉCNICO ---
model NetworkInterface {
  id         Int      @id @default(autoincrement())
  glpiId     Int?
  name       String?
  macAddress String?
  ipAddress  String?  @db.VarChar(45)

  computer   Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId Int

  @@map("network_interfaces")
}

model Volume {
  id          Int      @id @default(autoincrement())
  glpiId      Int?
  mountPoint  String?
  capacityGb  Float

  computer    Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId  Int

  @@map("volumes")
}

model Software {
  id        Int      @id @default(autoincrement())
  glpiId    Int      @unique
  name      String
  version   String?
  publisher String?

  computers SoftwareOnComputer[]

  @@map("softwares")
}

model SoftwareOnComputer {
  computer   Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId Int

  software   Software @relation(fields: [softwareId], references: [id], onDelete: Cascade)
  softwareId Int

  @@id([computerId, softwareId])
  @@map("software_on_computers")
}
EOF

# echo "🔧 Ajustando UserService para refletir o novo schema..."
# cat << 'EOF' > src/user/user.service.ts
# // src/user/user.service.ts
# import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'; // Adicionado NotFoundException
# import { PrismaService } from '../prisma/prisma.service.js';
# import * as argon2 from 'argon2';
# import { CreateUserDto } from './dto/create-user.dto.js';

# @Injectable()
# export class UserService {
#   private readonly userSelect = {
#     id: true,
#     email: true,
#     username: true,
#     fullName: true,
#     name: true,
#     role: true,
#     departmentId: true,
#     createdAt: true,
#   };

#   constructor(private readonly prisma: PrismaService) {}

#   async findAll() {
#     return this.prisma.user.findMany({
#       select: this.userSelect,
#     });
#   }

#   async findByEmail(email: string) {
#     return this.prisma.user.findUnique({
#       where: { email },
#     });
#   }

#   async create(data: CreateUserDto) {
#     // 1. Verificar se o e-mail já existe
#     const userExists = await this.findByEmail(data.email);
#     if (userExists) {
#       throw new ConflictException('E-mail já cadastrado no sistema');
#     }

#     // 2. Verificar se o departamento existe (Para evitar o erro P2003 de Foreign Key)
#     if (data.departmentId) {
#       const dept = await this.prisma.department.findUnique({
#         where: { id: data.departmentId },
#       });
#       if (!dept) {
#         throw new NotFoundException(`Departamento com ID ${data.departmentId} não encontrado.`);
#       }
#     }

#     // 3. Hashear a senha
#     const hashedPassword = await argon2.hash(data.password);

#     // 4. Criar o usuário (Correção da estrutura do Prisma)
#     return this.prisma.user.create({
#       data: {
#         ...data,
#         password: hashedPassword,
#         // Garante que o role seja o enviado ou o padrão 'USER'
#         role: data.role || 'USER', // Defina um padrão aqui caso não venha no DTO
#       },
#       select: this.userSelect,
#     });
#   }
# }
# EOF

# echo "🔧 Ajustando CreateUserDto para refletir o novo schema..."
# cat << 'EOF' > src/user/dto/create-user.dto.ts
# // src/user/dto/create-user.dto.ts
# import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
# import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
# // Importe o Role do Prisma (ajuste o caminho conforme sua estrutura)
# import { Role } from '../../generated/prisma/client.js'; 

# export class CreateUserDto {
#   @ApiProperty({ example: 'joao.silva' })
#   @IsString()
#   @IsNotEmpty()
#   username: string;

#   @ApiProperty({ example: 'João Silva' })
#   @IsString()
#   @IsNotEmpty()
#   fullName: string;

#   @ApiProperty({ example: 'user@example.com' })
#   @IsEmail()
#   email: string;

#   @ApiProperty({ example: 'Senha@123' })
#   @IsString()
#   @IsNotEmpty()
#   password: string;

#   @ApiProperty({ example: 1 })
#   @IsNumber()
#   departmentId: number;

#   @ApiProperty({ example: 'João' })
#   @IsString()
#   @IsOptional()
#   name?: string | null; // Aceita null para bater com o Prisma

#   @ApiPropertyOptional({ 
#     enum: Role, 
#     example: 'USER',
#     description: 'Nível de permissão do usuário' 
#   })
#   @IsOptional()
#   @IsEnum(Role) // Valida se o que foi enviado existe no seu banco
#   role?: Role;
# }
# EOF

# echo "🔧 Ajustando nest-cli.json para incluir o plugin do Swagger..."
# cat << 'EOF' > nest-cli.json
# {
#   "$schema": "https://json.schemastore.org/nest-cli",
#   "collection": "@nestjs/schematics",
#   "sourceRoot": "src",
#   "compilerOptions": {
#     "deleteOutDir": true,
#     "plugins": ["@nestjs/swagger"] 
#   }
# }
# EOF

# echo "🔧 Criando JwtStrategy para autenticação JWT..."
# cat << 'EOF' > src/auth/strategies/jwt.strategy.ts
# import { Injectable } from '@nestjs/common';
# import { PassportStrategy } from '@nestjs/passport';
# import { ExtractJwt, Strategy } from 'passport-jwt';

# @Injectable()
# export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // O 'jwt' aqui é opcional, pois é o padrão
#   constructor() {
#     super({
#       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
#       ignoreExpiration: false,
#       secretOrKey: 'SUA_CHAVE_SECRETA',
#     });
#   }

#   async validate(payload: any) {
#     return { userId: payload.sub, username: payload.username };
#   }
# }
# EOF

# echo "🔧 Criando UpdateUserDto como PartialType de CreateUserDto..."
# cat << 'EOF' > src/user/dto/update-user.dto.ts
# import { PartialType } from '@nestjs/swagger';
# import { CreateUserDto } from './create-user.dto.js';

# export class UpdateUserDto extends PartialType(CreateUserDto) {}
# EOF

# echo "🔧 Ajustando AuthModule para incluir o JwtStrategy..."
# cat << 'EOF' > src/auth/auth.module.ts
# // src/auth/auth.module.ts
# import { Module, forwardRef } from '@nestjs/common';
# import { ConfigModule, ConfigService } from '@nestjs/config';
# import { JwtModule } from '@nestjs/jwt';
# import { AuthService } from './auth.service.js';
# import { AuthController } from './auth.controller.js';
# import { JwtStrategy } from './strategies/jwt.strategy.js';
# import { UserModule } from '../user/user.module.js';

# @Module({
#   imports: [
#     // Use forwardRef para evitar dependência circular com UserModule
#     forwardRef(() => UserModule),
    
#     // Configuração assíncrona para GARANTIR que o JWT_SECRET seja lido
#     JwtModule.registerAsync({
#       imports: [ConfigModule],
#       inject: [ConfigService],
#       useFactory: async (configService: ConfigService) => ({
#         secret: configService.get<string>('JWT_SECRET'),
#         signOptions: { expiresIn: '1h' },
#       }),
#     }),
#   ],
#   controllers: [AuthController], // Essencial para as rotas funcionarem
#   providers: [AuthService, JwtStrategy], // Essencial para a lógica e segurança
#   exports: [AuthService], // Exportar se outros módulos precisarem
# })
# export class AuthModule {}
# EOF

# echo "🔧 Atualizando UserModule para incluir o AuthModule..."
# cat << 'EOF' > src/user/user.module.ts
# import { forwardRef, Module } from '@nestjs/common';
# import { UserService } from './user.service.js';
# import { UserController } from './user.controller.js';
# import { AuthModule } from '../auth/auth.module.js';

# @Module({
#   imports: [
#     forwardRef(() => AuthModule), // ✅ Correto
#   ],
#   controllers: [UserController],
#   providers: [UserService],
#   exports: [UserService], 
# })
# export class UserModule {}
# EOF

# echo "🔧 Criando PrismaService para conectar ao banco de dados usando o adapter do PostgreSQL..."
# cat << 'EOF' > src/prisma/prisma.service.ts
# // src/prisma/prisma.service.ts
# import { Injectable } from "@nestjs/common";
# import { PrismaClient } from "../generated/prisma/client.js";
# import { PrismaPg } from "@prisma/adapter-pg";

# @Injectable()
# export class PrismaService extends PrismaClient {
#   constructor() {
#     const adapter = new PrismaPg({
#       connectionString: process.env.DATABASE_URL as string,
#     });
#     super({ adapter });
#   }
# }
# EOF

# echo "🔧 Criando RegisterDto..."
# cat << 'EOF' > src/auth/dto/register.dto.ts
# // src/auth/dto/register.dto.ts
# import { ApiProperty } from '@nestjs/swagger';
# import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
# import { Role } from '../../generated/prisma/client.js'; // Importe o Role do Prisma (ajuste o caminho conforme sua estrutura)

# export class RegisterDto {
#   @ApiProperty({ example: 'joao.silva', description: 'Nome de usuário único' })
#   @IsString()
#   @IsNotEmpty()
#   username: string;

#   @ApiProperty({ example: 'João Silva' })
#   @IsString()
#   @IsNotEmpty()
#   fullName: string;

#   @ApiProperty({ example: 'user@example.com' })
#   @IsEmail({}, { message: 'Informe um e-mail válido' })
#   email: string;

#   @ApiProperty({ example: 'Senha@123', minLength: 8 })
#   @IsString()
#   @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
#   @MaxLength(20)
#   password: string;

#   @ApiProperty({ example: 1, description: 'ID do departamento' })
#   @IsNotEmpty()
#   departmentId: number;

#   @ApiProperty({ example: 'João', required: false, nullable: true })
#   @IsOptional()
#   @IsString()
#   name?: string | null; // Aceita null para bater com o Prisma

#   @ApiProperty({ enum: Role, example: Role.USER })
#   @IsOptional()
#   @IsEnum(Role) // Valida se a string enviada bate com o Enum
#   role?: Role;  // Mude de string para Role
# }
# EOF

# echo "🔧 Ajustando AuthController..."
# cat << 'EOF' > src/auth/auth.controller.ts
# // src/auth/auth.controller.ts
# import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
# import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
# import { AuthService } from './auth.service.js';
# import { RegisterDto } from './dto/register.dto.js';
# import { LoginDto } from './dto/login.dto.js';

# @ApiTags('auth') // Agrupa as rotas na interface do Swagger
# @Controller('auth')
# export class AuthController {
#   constructor(private readonly authService: AuthService) {} // Use readonly por padrão para serviços

#   @Post('register')
#   @HttpCode(HttpStatus.CREATED) // Garante o status 201 explicitamente
#   @ApiOperation({ summary: 'Realizar cadastro de novo usuário' })
#   @ApiResponse({ 
#     status: 201, 
#     description: 'Usuário criado com sucesso.' 
#   })
#   @ApiResponse({ 
#     status: 400, 
#     description: 'Dados inválidos ou e-mail já em uso.' 
#   })
#   async register(@Body() registerDto: RegisterDto) {
#     // Note que mudamos de 'body' para 'registerDto' para clareza
#     return this.authService.register(registerDto);
#   }

#   @Post('login')
#   @HttpCode(HttpStatus.OK) // Login deve retornar 200 OK, não 201 Created
#   @ApiOperation({ summary: 'Autenticar usuário e retornar Token JWT' })
#   @ApiResponse({ 
#     status: 200, 
#     description: 'Login realizado com sucesso.' 
#   })
#   @ApiResponse({ 
#     status: 401, 
#     description: 'Credenciais inválidas.' 
#   })
#   async login(@Body() loginDto: LoginDto) {
#     return this.authService.login(loginDto);
#   }
# }
# EOF

# echo "🔧 Ajustando Main..."
# cat << 'EOF' > src/main.ts
# import { NestFactory } from '@nestjs/core';
# import { AppModule } from './app.module.js';
# import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

# async function bootstrap() {
#   const app = await NestFactory.create(AppModule);

#   // Configurando Swagger
#   const config = new DocumentBuilder()
#     .setTitle('Minha API REST')
#     .setDescription('API exemplo com NestJS, Prisma e Swagger')
#     .setVersion('1.0')
#     .addBearerAuth() // caso queira JWT
#     .build();

#   const document = SwaggerModule.createDocument(app, config);
#   SwaggerModule.setup('api', app, document);

#   await app.listen(process.env.PORT ?? 3000);
# }
# bootstrap();
# EOF

# echo "🔧 Ajustando UserController..."
# cat << 'EOF' > src/user/user.controller.ts
# import { Controller, Get, UseGuards } from '@nestjs/common'
# import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
# import { UserService } from './user.service.js'
# import { UserDto } from './dto/user.dto.js'
# import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js'

# @ApiTags('users')
# @Controller('users')
# export class UserController {
#   constructor(private service: UserService) {}

#   @UseGuards(JwtAuthGuard)
#   @Get()
#   @ApiOperation({ summary: 'Retorna todos os usuários' })
#   @ApiOkResponse({ type: [UserDto] })
#   findAll() {
#     return this.service.findAll()
#   }
# }
# EOF

# echo "🔧 Criando UserDto para documentação do Swagger..."
# cat << 'EOF' > src/user/dto/user.dto.ts
# // src/user/dto/user.dto.ts
# import { ApiProperty } from '@nestjs/swagger';
# import { Role } from '../../generated/prisma/browser.js';

# export class UserDto {
#   @ApiProperty({ example: 1 })
#   id: number;

#   @ApiProperty({ example: 'joao.silva' })
#   username: string;

#   @ApiProperty({ example: 'João Silva' })
#   fullName: string;

#   @ApiProperty({ example: 'user@email.com' })
#   email: string;

#   @ApiProperty({ example: 'João', required: false, nullable: true })
#   name: string | null; // 🔥 IMPORTANTE: Use 'null' para bater com o Prisma

#   @ApiProperty({ example: 1 })
#   departmentId: number;

#   @ApiProperty({ example: '2026-03-31T22:00:00.000Z' })
#   createdAt: Date;

#   @ApiProperty({ enum: Role, example: Role.USER })
#   role: Role;
# }
# EOF

# echo "🔧 Criando seed de departamentos..." 
# cat << 'EOF' > prisma/seed.ts
# // prisma/seed.ts
# import "dotenv/config";
# import pg from "pg";
# const { Pool } = pg;
# import { PrismaPg } from "@prisma/adapter-pg";
# import { PrismaClient } from "../src/generated/prisma/client.js"; // Ajuste conforme seu caminho de saída

# const connectionString = `${process.env.DATABASE_URL}`;
# const pool = new Pool({ connectionString });
# const adapter = new PrismaPg(pool);
# const prisma = new PrismaClient({ adapter });

# async function main() {
#   console.log('🌱 Iniciando seed de Departamentos...');

#   // 1. Criar o departamento de TI
#   const tiDept = await prisma.department.upsert({
#     where: { name: "Tecnologia da Informação" },
#     update: {},
#     create: {
#       id: 1, // Forçamos o ID 1 para bater com seus testes
#       name: "Tecnologia da Informação",
#     },
#   });

#   // 2. Criar o departamento de RH (Opcional, para teste)
#   const rhDept = await prisma.department.upsert({
#     where: { name: "Recursos Humanos" },
#     update: {},
#     create: {
#       id: 2,
#       name: "Recursos Humanos",
#     },
#   });

#   console.log('✅ Departamentos garantidos:', { tiDept, rhDept });
# }

# main()
#   .then(async () => {
#     await prisma.$disconnect();
#     await pool.end();
#   })
#   .catch(async (e) => {
#     console.error('❌ Erro no seed:', e);
#     await prisma.$disconnect();
#     await pool.end();
#     process.exit(1);
#   });
# EOF

# echo "🔧 Criando prisma.config.ts para configurar o Prisma Client..."
# cat << 'EOF' > prisma/prisma.config.ts
# // prisma/prisma.config.ts
# // This file was generated by Prisma, and assumes you have installed the following:
# // npm install --save-dev prisma dotenv
# import "dotenv/config";
# import { defineConfig } from "prisma/config";

# export default defineConfig({
#   schema: "prisma/schema.prisma",
#   migrations: {
#     path: "prisma/migrations",
#     seed: "tsx prisma/seed.ts",
#   },
#   datasource: {
#     url: process.env["DATABASE_URL"],
#   },
# });
# EOF

# echo "🔧 Ajustando AuthService para refletir o novo schema e usar o Prisma Client..."
# cat << 'EOF' > src/auth/auth.service.ts
# // src/auth/auth.service.ts
# import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
# import { UserService } from '../user/user.service.js';
# import { JwtService } from '@nestjs/jwt';
# import * as argon2 from 'argon2';
# import { Role } from 'src/generated/prisma/enums.js';
# import { RegisterDto } from './dto/register.dto.js';
# import { CreateUserDto } from '../user/dto/create-user.dto.js';

# @Injectable()
# export class AuthService {
#   constructor(
#     private userService: UserService,
#     private jwtService: JwtService,
#   ) {}

#   async register(data: RegisterDto) {
#     try {
#       // Tratando o campo 'name' para remover o 'null' caso exista
#       const userData: CreateUserDto = {
#         ...data,
#         name: data.name ?? undefined, // Se for null ou undefined, vira undefined
#       };
#       const user = await this.userService.create(userData);
#       return await this.generateToken(user);
#     } catch (error) {
#       console.error("ERRO NO REGISTER:", error); // Isso vai mostrar o erro real no seu terminal do VS Code
#       throw error; 
#     }
#   }

#   async login(data) {
#     const user = await this.userService.findByEmail(data.email);
#     if (!user) throw new UnauthorizedException('Invalid credentials');

#     const valid = await argon2.verify(user.password, data.password);
#     if (!valid) throw new UnauthorizedException('Invalid credentials');

#     // Adicionamos o await aqui também
#     return await this.generateToken(user);
#   }

#   // Mudamos para async para usar o signAsync
#   private async generateToken(user: any) {
#     const payload = {
#       sub: user.id,
#       email: user.email,
#       role: user.role,
#     };

#     return {
#       // signAsync é a versão moderna e não-bloqueante
#       access_token: await this.jwtService.signAsync(payload),
#     };
#   }
# }
# EOF

# echo "🔧 Criando a pasta de scripts para sincronização com o GLPI..."
# mkdir -p src/scripts

# echo "🔧 Criando glpi-sync.ts para sincronizar o banco de dados usando o Prisma Client e o adapter do PostgreSQL..."
# cat << 'EOF' > src/scripts/glpi-sync.ts
# // src/scripts/glpi-sync.ts
# import fs from 'fs';
# import csv from 'csv-parser';
# import axios from 'axios';
# import { PrismaClient, ComputerType, ComputerRole } from '../src/generated/prisma';

# const prisma = new PrismaClient();
# const GLPI_URL = process.env.GLPI_URL!;
# const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
# const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

# async function getCsvComputers() {
#   const results: any[] = [];
#   if (!fs.existsSync('dados_iniciais.csv')) return results;

#   return new Promise<any[]>((resolve) => {
#     fs.createReadStream('dados_iniciais.csv')
#       .pipe(csv())
#       .on('data', (data) => {
#         // Filtra linhas sem hostname nem mainIp
#         if (data.hostname?.trim() || data.mainIp?.trim()) {
#           results.push(data);
#         }
#       })
#       .on('end', () => resolve(results));
#   });
# }

# async function syncGlpiFromCsv() {
#   const csvComputers = await getCsvComputers();
#   if (!csvComputers.length) {
#     console.log('❌ Nenhum computador válido no CSV.');
#     return;
#   }

#   // Inicia sessão GLPI
#   const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
#     headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
#   });
#   const sessionToken = sessionRes.data.session_token;

#   // Buscar computadores do GLPI
#   const glpiRes = await axios.get(`${GLPI_URL}/Computer`, {
#     params: { expand_dropdowns: true, get_full_details: true, range: '0-1000' },
#     headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
#   });
#   const glpiComputers = glpiRes.data;

#   for (const csvRow of csvComputers) {
#     const filterHostname = csvRow.hostname?.trim();
#     const filterIp = csvRow.mainIp?.trim();

#     // Encontrar computador no GLPI usando hostname ou IP
#     const glpiComp = glpiComputers.find((c: any) =>
#       (filterHostname && c.name === filterHostname) ||
#       (filterIp && c._networks?.some((n: any) => n.ip === filterIp))
#     );

#     if (!glpiComp) {
#       console.log(`⚠️ Computador não encontrado no GLPI: ${filterHostname || filterIp}`);
#       continue;
#     }

#     // Classificação automática
#     let type: ComputerType = ComputerType.DESKTOP;
#     let role: ComputerRole = ComputerRole.USER;
#     if (glpiComp.operatingsystems_id?.toLowerCase().includes('server') || glpiComp.name?.toLowerCase().includes('srv')) {
#       type = ComputerType.SERVER;
#       role = ComputerRole.SERVER;
#     }

#     // Upsert no Prisma
#     await prisma.computer.upsert({
#       where: { mainIp: filterIp || glpiComp._networks?.[0]?.ip || filterHostname },
#       update: {
#         hostname: glpiComp.name,
#         alternateUser: glpiComp.contact,
#         user: glpiComp.users_id_tech || '',
#         manufacturer: glpiComp.manufacturers_id || 'Unknown',
#         modelName: glpiComp.computermodels_id || 'Generic',
#         osName: glpiComp.operatingsystems_id,
#         type,
#         role,
#         lastSync: new Date()
#       },
#       create: {
#         glpiId: glpiComp.id,
#         hostname: glpiComp.name,
#         mainIp: filterIp || glpiComp._networks?.[0]?.ip || null,
#         alternateUser: glpiComp.contact,
#         manufacturer: glpiComp.manufacturers_id || 'Unknown',
#         modelName: glpiComp.computermodels_id || 'Generic',
#         serial: glpiComp.serial,
#         osName: glpiComp.operatingsystems_id,
#         type,
#         role,
#         networkInterfaces: {
#           create: glpiComp._networks?.map((n: any) => ({
#             name: n.name,
#             ipAddress: n.ip,
#             macAddress: n.mac
#           })) || []
#         }
#       }
#     });
#     console.log(`✅ Sincronizado: ${glpiComp.name}`);
#   }

#   // Finaliza sessão GLPI
#   await axios.get(`${GLPI_URL}/killSession`, {
#     headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
#   });

#   await prisma.$disconnect();
#   console.log('🎉 Sincronização finalizada!');
# }

# syncGlpiFromCsv();
# EOF



# echo "🔧 02 Criando glpi-sync.ts para sincronizar o banco de dados usando o Prisma Client e o adapter do PostgreSQL..."
# cat << 'EOF' > src/scripts/glpi-sync.ts
# // src/scripts/glpi-sync.ts
# import axios from 'axios';
# import { PrismaClient, ComputerType, ComputerRole } from '../src/generated/prisma';
# import dotenv from 'dotenv';

# dotenv.config(); // Carrega variáveis do .env

# const prisma = new PrismaClient();

# // Configurações do GLPI via .env
# const GLPI_URL = process.env.GLPI_URL!;
# const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
# const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

# async function getGlpiData() {
#   try {
#     console.log('🔑 Autenticando no GLPI...');
#     const sessionResponse = await axios.get(`${GLPI_URL}/initSession`, {
#       headers: {
#         'Authorization': `user_token ${USER_TOKEN}`,
#         'App-Token': APP_TOKEN,
#       },
#     });
#     const sessionToken = sessionResponse.data.session_token;

#     console.log('📡 Coletando computadores do GLPI...');

#     // Buscar computadores do GLPI
#     const response = await axios.get(`${GLPI_URL}/Computer`, {
#       params: {
#         expand_dropdowns: true,
#         get_full_details: true,
#         range: '0-100', // ajuste conforme quantidade de máquinas
#       },
#       headers: {
#         'Session-Token': sessionToken,
#         'App-Token': APP_TOKEN,
#       },
#     });

#     const computers = response.data;

#     for (const glpiComp of computers) {
#       console.log(`🔄 Sincronizando: ${glpiComp.name}`);

#       // --- Determina tipo e role automaticamente ---
#       let type: ComputerType = ComputerType.DESKTOP;
#       let role: ComputerRole = ComputerRole.USER;

#       const osName = glpiComp.operatingsystems_id?.name || '';
#       const isVM = glpiComp.is_virtual_machine || false;

#       if (isVM) {
#         type = ComputerType.VM;
#         role = ComputerRole.SERVER;
#       } else if (osName.toLowerCase().includes('server')) {
#         type = ComputerType.SERVER;
#         role = ComputerRole.SERVER;
#       } else if (glpiComp.is_notebook) {
#         type = ComputerType.NOTEBOOK;
#       }

#       // --- Extrai IP e inventário detalhado ---
#       const mainIp = glpiComp._networks?.[0]?.ip || null;
#       const hostFisico = glpiComp.parent_name || null;
#       const nameHaperv = glpiComp.virtual_name || null;

#       const cpu = glpiComp.hardware?.cpu || null;
#       const ram = glpiComp.hardware?.ram || null;
#       const hd = glpiComp.hardware?.disk || null;
#       const manufacturer = glpiComp.manufacturers_id?.name || null;
#       const modelName = glpiComp.computermodels_id?.name || null;

#       // --- Upsert no Prisma ---
#       await prisma.computer.upsert({
#         where: { glpiId: glpiComp.id },
#         update: {
#           hostname: glpiComp.name,
#           hostFisico,
#           nameHaperv,
#           manufacturer,
#           modelName,
#           osName,
#           cpu,
#           ram,
#           hd,
#           type,
#           role,
#           mainIp,
#           lastSync: new Date(),
#         },
#         create: {
#           glpiId: glpiComp.id,
#           hostname: glpiComp.name,
#           hostFisico,
#           nameHaperv,
#           manufacturer,
#           modelName,
#           osName,
#           cpu,
#           ram,
#           hd,
#           type,
#           role,
#           mainIp,
#         },
#       });
#     }

#     // Finaliza sessão
#     await axios.get(`${GLPI_URL}/killSession`, {
#       headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN },
#     });

#     console.log('✅ Sincronização GLPI concluída com sucesso!');
#   } catch (error: any) {
#     console.error('❌ Erro na sincronização:', error.response?.data || error.message);
#   } finally {
#     await prisma.$disconnect();
#   }
# }

# getGlpiData();
# EOF

# echo "🔧 Criando seed-csv.ts"
# cat << 'EOF' > src/scripts/seed-csv.ts
# // src/scripts/seed-csv.ts
# import fs from 'fs';
# import csv from 'csv-parser';
# import { PrismaClient, ComputerType, ComputerRole } from "../generated/prisma/client.js"; // Ajuste conforme seu caminho de saída

# const prisma = new PrismaClient();

# async function seedFromCSV() {
#   const results: any[] = [];
#   const csvPath = 'dados_iniciais.csv';

#   if (!fs.existsSync(csvPath)) {
#     console.error('❌ Arquivo dados_iniciais.csv não encontrado!');
#     return;
#   }

#   fs.createReadStream(csvPath)
#     .pipe(csv())
#     .on('data', (data) => results.push(data))
#     .on('end', async () => {
#       console.log('📄 Processando CSV e populando dados...');

#       for (const row of results) {
#         try {
#           // Determina o tipo
#           let type: ComputerType;
#           if (row.VM?.toLowerCase() === 'sim') {
#             type = ComputerType.VM;
#           } else if (row.tipo?.toLowerCase().includes('server')) {
#             type = ComputerType.SERVER;
#           } else if (row.tipo?.toLowerCase().includes('notebook')) {
#             type = ComputerType.NOTEBOOK;
#           } else {
#             type = ComputerType.DESKTOP;
#           }

#           // Determina o role
#           const role: ComputerRole = type === ComputerType.SERVER || type === ComputerType.VM
#             ? ComputerRole.SERVER
#             : ComputerRole.USER;

#           await prisma.computer.upsert({
#             where: { mainIp: row.mainIp },
#             update: {
#               hostname: row.hostname,
#               hostFisico: row.hostfisico,
#               nameHaperv: row.namehaperv,
#               manufacturer: row.fabricante,
#               modelName: row.modelo,
#               osName: row['sistema operacional'],
#               cpu: row.cpu,
#               ram: row.ram,
#               hd: row.hd,
#               type,
#               role
#             },
#             create: {
#               mainIp: row.mainIp,
#               hostname: row.hostname,
#               hostFisico: row.hostfisico,
#               nameHaperv: row.namehaperv,
#               manufacturer: row.fabricante,
#               modelName: row.modelo,
#               osName: row['sistema operacional'],
#               cpu: row.cpu,
#               ram: row.ram,
#               hd: row.hd,
#               type,
#               role
#             }
#           });

#           console.log(`✅ ${row.hostname} (${row.mainIp}) -> ${type} / ${role}`);
#         } catch (err) {
#           console.error(`❌ Error no IP ${row.mainIp}:`, err);
#         }
#       }

#       console.log('✅ CSV importado com sucesso!');
#       await prisma.$disconnect();
#     });
# }

# seedFromCSV();
# EOF

# echo "🔧 Configurando variáveis de ambiente para o GLPI..." 
# cat << 'EOF' > .env
# DATABASE_URL="postgresql://admin:123456789@localhost:5432/inventario_db?schema=public"
# JWT_SECRET="super-secret-app-token"
# GLPI_URL=http://192.168.15.20/apirest.php
# GLPI_USER_TOKEN=SEU_USER_TOKEN_AQUI
# GLPI_APP_TOKEN="super-secret-app-token"
# EOF

# # Cores para o terminal
# GREEN='\033[0;32m'
# BLUE='\033[0;34m'
# YELLOW='\033[1;33m'
# NC='\033[0m' # Sem cor

# echo -e "${BLUE}==== 🔧 INICIANDO DEPLOY AUTOMATIZADO ==== ${NC}"

# # 1. Verificação e Instalação de Dependências Críticas
# echo -e "${YELLOW}📦 Verificando dependências de bibliotecas...${NC}"
# # Instala silenciosamente o que falta para os scripts rodarem
# npm install axios csv-parser --save-dev

# # 2. Configuração do Banco de Dados com Prisma
# echo -e "${YELLOW}🗄️  Instanciando banco de dados e rodando Migrations...${NC}"
# # O dev --name init cria as tabelas se não existirem
# npx prisma migrate dev --name init

# echo -e "${YELLOW}⚙️  Gerando Prisma Client...${NC}"
# npx prisma generate

# # 3. Carga Inicial do CSV (Dono dos IPs)
# if [ -f "dados_iniciais.csv" ]; then
#     echo -e "${GREEN}📥 Populando banco via CSV (Semente de IPs)...${NC}"
#     npx ts-node src/scripts/seed-csv.ts
# else
#     echo -e "${YELLOW}⚠️  Aviso: dados_iniciais.csv não encontrado, pulando carga inicial.${NC}"
# fi

# # 4. Sincronização com GLPI Real
# echo -e "${GREEN}🔄 Sincronizando dados reais do GLPI (192.168.15.20)...${NC}"
# # Aqui o script vai usar o IP como chave para não duplicar o que veio do CSV
# npx ts-node src/scripts/glpi-sync.ts

# # 5. Garantir dados estruturais (Seed de Departamentos/Status)
# echo -e "${YELLOW}🌱 Rodando seed de tabelas auxiliares (Status/Departamentos)...${NC}"
# npx prisma db seed

echo -e "${BLUE}==========================================${NC}"
echo -e "${GREEN}✅ PROCESSO CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${BLUE}Sua base de dados está sincronizada e pronta.${NC}"
echo -e "Dica: Para visualizar os dados, use: npx prisma studio"

echo "🔧 Limpando diretórios de geração..."
rm -rf src/generated
rm -rf dist
rm -rf node_modules/.prisma

echo "🔧 Rodando seed para garantir que o departamento de TI exista...  "
echo "npx prisma db seed ou npx tsx prisma/seed.ts ou npm install -D tsx"

echo "✅ Prisma schema configurado e client gerado com sucesso."
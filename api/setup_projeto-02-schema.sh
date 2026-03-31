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

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await argon2.hash(data.password)

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
        fullName: data.fullName,
        departmentId: data.departmentId,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })
  }
}
EOF

echo "🔧 Ajustando CreateUserDto para refletir o novo schema..."
cat << 'EOF' > src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'joao.silva' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  departmentId: number;

  @ApiProperty({ example: 'João', required: false })
  @IsOptional()
  @IsString()
  name?: string;
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

echo "🔧 Gerando Prisma Client..."
npx prisma generate

echo "✅ Prisma schema configurado e client gerado com sucesso."
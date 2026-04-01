#!/bin/bash

set -e

PROJECT_NAME="api-zabbix"

cd $PROJECT_NAME

echo "💎 Atualizando schema.prisma..."
mkdir -p prisma

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

enum NotificationPriority {
  NOT_CLASSIFIED
  INFORMATION
  WARNING
  AVERAGE
  HIGH
  DISASTER
}

enum AccountStatusEvent {
  ACCOUNT_DISABLED
  ACCOUNT_ENABLED
}

model User {
  id           Int      @id @default(autoincrement())
  username     String   @unique
  fullName     String   @map("full_name")
  email        String   @unique
  password     String
  name         String?
  role         Role     @default(USER)
  
  department   Department @relation(fields: [departmentId], references: [id])
  departmentId Int        @map("department_id")

  assignments  Assignment[]
  accountLogs  UserAccountLog[]

  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  @@map("users")
}

model UserAccountLog {
  id          Int                @id @default(autoincrement())
  event       AccountStatusEvent @default(ACCOUNT_DISABLED)
  reason      String?            
  adminUser   String?            @map("admin_user") 
  ipAddress   String?            @map("ip_address") 
  
  user        User               @relation(fields: [userId], references: [id])
  userId      Int                @map("userId")

  createdAt   DateTime           @default(now()) @map("created_at")

  @@map("user_account_logs")
}

model Asset {
  id             Int       @id @default(autoincrement())
  hostname       String?   @unique
  ipAddress      String?   @map("ip_address")
  serialNumber   String    @unique @map("serial_number")
  assetTag       String?   @unique @map("asset_tag")
  purchaseDate   DateTime? @map("purchase_date")
  warrantyExpiry DateTime? @map("warranty_expiry")
  
  status         Status    @relation(fields: [statusId], references: [id])
  statusId       Int       @map("status_id")
  
  model          Model     @relation(fields: [modelId], references: [id])
  modelId        Int       @map("model_id")

  location       Location? @relation(fields: [locationId], references: [id])
  locationId     Int?      @map("location_id")

  assignments    Assignment[]
  notifications  Notification[] 
  
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")

  @@map("assets")
}

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

model Notification {
  id            Int                  @id @default(autoincrement())
  eventid       String?              @unique
  host          String               
  ipAddress     String?              @map("ip_address")
  triggerName   String               @map("trigger_name")
  priority      NotificationPriority @default(AVERAGE)
  status        String               
  message       String?              @db.Text
  acknowledged  Boolean              @default(false)

  asset         Asset?               @relation(fields: [assetHostname], references: [hostname])
  assetHostname String?              @map("asset_hostname")

  createdAt     DateTime             @default(now()) @map("created_at")
  resolvedAt    DateTime?            @map("resolved_at")

  @@map("notifications")
}

model Department {
  id    Int    @id @default(autoincrement())
  name  String @unique 
  users User[]

  @@map("departments")
}

model Model {
  id           Int      @id @default(autoincrement())
  name         String   
  manufacturer String   
  category     String   
  assets       Asset[]

  @@map("models")
}

model Status {
  id     Int     @id @default(autoincrement())
  name   String  
  assets Asset[]

  @@map("status")
}

model Location {
  id     Int     @id @default(autoincrement())
  name   String  
  assets Asset[]

  @@map("locations")
}
EOF

rm -rf dist

echo "🚀 Executando Prisma..."
npx prisma generate
npx prisma migrate dev --name full_system_update

echo "📁 Criando módulo Monitoring..."
mkdir -p src/monitoring/dto

cat << 'EOF' > src/monitoring/dto/zabbix-webhook.dto.ts
// src/monitoring/dto/zabbix-webhook.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationPriority } from '../../generated/prisma/client.js';

export class ZabbixWebhookDto {
  @ApiProperty()
  @IsString()
  eventid: string;

  @ApiProperty()
  @IsString()
  host: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty()
  @IsString()
  triggerName: string;

  @ApiProperty({ enum: NotificationPriority })
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;

  @ApiProperty({ example: 'PROBLEM' })
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
EOF

echo "📄 Criando monitoring.module.ts..."
cat << 'EOF' > src/monitoring/monitoring.module.ts
// src/monitoring/monitoring.module.ts
import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service.js';
import { MonitoringController } from './monitoring.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [MonitoringService],
  controllers: [MonitoringController],
})
export class MonitoringModule {}
EOF

echo "📄 Criando monitoring.service.ts..."
cat << 'EOF' > src/monitoring/monitoring.service.ts
// src/monitoring/monitoring.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';

@Injectable()
export class MonitoringService {
  constructor(private prisma: PrismaService) {}

  async handleWebhook(data: ZabbixWebhookDto) {
    try {
      return await this.prisma.notification.upsert({
        where: { eventid: data.eventid },
        update: {
          status: data.status,
          resolvedAt: data.status === 'RESOLVED' ? new Date() : null,
        },
        create: {
          eventid: data.eventid,
          host: data.host,
          ipAddress: data.ipAddress,
          triggerName: data.triggerName,
          priority: data.priority,
          status: data.status,
          message: data.message,
          // assetHostname: data.host, ← se estiver dando erro, comenta isso
        },
      });
    } catch (error) {
      console.error('🔥 ERRO COMPLETO:', error);
      console.error('🔥 CODE:', error.code);
      console.error('🔥 META:', error.meta);
      throw error;
    }
  }
}
EOF

echo "📄 Criando monitoring.controller.ts..."
cat << 'EOF' > src/monitoring/monitoring.controller.ts
// src/monitoring/monitoring.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MonitoringService } from './monitoring.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Post('zabbix')
  @ApiOperation({ summary: 'Receber alerta do Zabbix' })
  @ApiResponse({ status: 201, description: 'Alerta processado com sucesso' })
  async receiveZabbixAlert(@Body() data: ZabbixWebhookDto) {
    return this.monitoringService.handleWebhook(data);
  }
}
EOF

echo "✅ Tudo pronto (sem erro de PrismaClient agora)"
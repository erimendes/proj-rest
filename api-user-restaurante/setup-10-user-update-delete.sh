#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

log() { echo -e "\033[1;34m$1\033[0m"; }

log "👤 SCRIPT-10: Implementando Update e Delete de Usuários..."

#########################################
# 1. CRIAR DTO DE ATUALIZAÇÃO
#########################################
log "📄 Criando UpdateUserDto..."

cat << 'EOF' > src/modules/user/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'joao.silva@exemplo.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'novaSenha123', required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'João Silva Atualizado', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
EOF

#########################################
# 2. ATUALIZAR USER SERVICE (Lógica de Hash e DB)
#########################################
log "⚙️  Atualizando UserService..."

cat << 'EOF' > src/modules/user/user.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) throw new ConflictException('E-mail já cadastrado');

    const hashedPassword = await argon2.hash(data.password);

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
EOF

#########################################
# 3. ATUALIZAR USER CONTROLLER (Rotas Protegidas)
#########################################
log "🎮 Atualizando UserController com Patch e Delete..."

cat << 'EOF' > src/modules/user/user.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar novo usuário' })
  register(@Body() body: RegisterDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.service.findAll();
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar meu próprio perfil' })
  updateMe(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.service.update(req.user.userId, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Deletar um usuário (Apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
EOF

log "✅ SCRIPT-10 CONCLUÍDO!"
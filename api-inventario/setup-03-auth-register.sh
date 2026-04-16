#!/usr/bin/env bash
set -euo pipefail

# Nome do projeto (ajuste se necessário)
PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

log() {
  echo -e "\033[1;32m$1\033[0m"
}

log "🚀 Iniciando acréscimo da funcionalidade de Register (Opção B)..."

#########################################
# 1. LIMPEZA DO USER SERVICE (Removendo o Hash Duplo)
#########################################
log "🧹 Removendo hash automático do UserService..."

cat << 'EOF' > src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Usamos o CreateUserDto para manter a compatibilidade que você já tinha,
  // mas agora sem fazer o hash aqui dentro.
  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // A senha já vem hasheada do AuthService
        name: data.name,
      },
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

#########################################
# 2. AUTH SERVICE (Adicionando a lógica de Register)
#########################################
log "🔑 Atualizando AuthService com método Register..."

cat << 'EOF' > src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, pass: string, name?: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso');
    }

    // Aqui centralizamos o HASH (Opção B)
    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
EOF

#########################################
# 3. AUTH CONTROLLER (Expondo a rota de Register)
#########################################
log "🎮 Atualizando AuthController no Swagger..."

cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registro de novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso', type: AuthResponseDto })
  @ApiConflictResponse({ description: 'E-mail já existe' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }
}
EOF

log "✅ FUNCIONALIDADE DE REGISTRO ADICIONADA!"
log "🛠️  O Hash duplo foi removido. Agora o fluxo está limpo."
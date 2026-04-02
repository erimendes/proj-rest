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

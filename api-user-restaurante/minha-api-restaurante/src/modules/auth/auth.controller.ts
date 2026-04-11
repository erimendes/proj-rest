import { Controller, Post, Body, Req, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Auto-cadastro de novos clientes' })
  @ApiResponse({ status: 201, description: 'Cadastro realizado e tokens gerados' })
  async register(@Body() body: CreateUserDto, @Req() req: any) {
    // Chama o register do AuthService que já hasheia e gera tokens
    return this.auth.register(body.email, body.password, body.name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário existente' })
  login(@Body() body: LoginDto, @Req() req: any) {
    return this.auth.login(body, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar Access Token' })
  @ApiResponse({ status: 200, description: 'Token renovado com sucesso' })
  refresh(@Body() body: RefreshTokenDto) {
    // O NestJS ValidationPipe já garante que o refreshToken existe aqui
    return this.auth.refresh(body.refreshToken);
  }
}

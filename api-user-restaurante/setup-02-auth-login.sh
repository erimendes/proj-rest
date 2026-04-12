#!/usr/bin/env bash
set -euo pipefail

# Usa o nome definido no script anterior se houver, ou o padrão
PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

log() {
  echo -e "\033[1;34m$1\033[0m"
}

log "📘 Turbinando Swagger para nível profissional..."

#########################################
# 📄 DTOs DE AUTH (Register, Login, Response)
#########################################

mkdir -p src/modules/auth/dto

cat << 'EOF' > src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @MinLength(6)
  password: string;
}
EOF

cat << 'EOF' > src/modules/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'novo@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false, example: 'João Silva' })
  @IsOptional()
  @IsString()
  name?: string;
}
EOF

cat << 'EOF' > src/modules/auth/dto/auth-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}
EOF

#########################################
# 🎮 AUTH CONTROLLER (Caminhos Corrigidos)
#########################################

cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
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
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
EOF

#########################################
# 📄 USER DTO (Para listagem)
#########################################

mkdir -p src/modules/user/dto
cat << 'EOF' > src/modules/user/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'usuario@exemplo.com' })
  email: string;

  @ApiProperty({ example: 'João Silva', nullable: true })
  name: string | null;

  @ApiProperty({ example: 'USER' })
  role: string;

  @ApiProperty()
  createdAt: Date;
}
EOF

#########################################
# 🔐 USER CONTROLLER (Protegido e Documentado)
#########################################

# Garante que o guard exista
mkdir -p src/modules/auth/guards
cat << 'EOF' > src/modules/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
EOF

cat << 'EOF' > src/modules/user/user.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários (Requer JWT)' })
  @ApiOkResponse({ type: [UserResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
  findAll() {
    return this.service.findAll();
  }
}
EOF

#########################################
# 🚀 MAIN.TS (Persistência e Swagger UI)
#########################################

cat << 'EOF' > src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API Moderna NestJS')
    .setDescription('NestJS + Prisma (Custom Output) + JWT Auth')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Insira o token JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
EOF

#########################################
# 🔐 AUTH SERVICE (Lógica de Login)
#########################################

log "🔑 Criando AuthService..."

cat << 'EOF' > src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
}
EOF

#########################################
# 🛡️ JWT STRATEGY (Validação do Token)
#########################################

log "🛡️ Criando JwtStrategy..."

mkdir -p src/modules/auth/strategies

cat << 'EOF' > src/modules/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    
    // Erro comum: Se o secret estiver vazio, o Passport quebra a aplicação
    if (!secret) {
      throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Se o payload não tiver o 'sub' (ID do usuário), o token é inválido
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token inválido ou malformado');
    }

    // O que retornamos aqui fica disponível em 'req.user'
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
EOF

#########################################
# 📦 AUTH MODULE (Conectando tudo)
#########################################

log "📦 Atualizando AuthModule..."

cat << 'EOF' > src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

// auth.module.ts
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
export * from './auth.service';
export * from './auth.controller';
export * from './strategies/jwt.strategy';
EOF

log "✅ SWAGGER PROFISSIONAL CONFIGURADO!"
log "📄 Documentação: http://localhost:3000/api"
#!/usr/bin/env bash
set -euo pipefail

# Configurações de cores
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Nome do projeto (Ajuste para bater com a pasta criada no SCRIPT-04)
PROJECT_NAME="${PROJECT_NAME:-minha-api-user}"

log() { echo -e "${BLUE}==> $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

# 1. Verificações Iniciais
if [ ! -d "$PROJECT_NAME" ]; then
    error "O diretório '$PROJECT_NAME' não existe. Execute o script de criação primeiro."
fi

cd "$PROJECT_NAME"
log "📘 Turbinando Swagger e Módulos de Autenticação em: $(pwd)"

#########################################
# 2. Estrutura de DTOs e Services
#########################################
log "📁 Criando estrutura de módulos..."
mkdir -p src/modules/user/dto src/modules/auth/dto src/modules/auth/guards src/modules/auth/strategies
log "📁 Configurando User DTOs..."

DTO_PATH="src/modules/user/dto/create-user.dto.ts"

cat << 'EOF' > src/modules/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client'; 

export class CreateUserDto {
  @ApiProperty({ example: 'teste01@teste.com' }) 
  @IsEmail() 
  email!: string;

  @ApiProperty({ example: '123456' }) 
  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password!: string;

  @ApiProperty({ example: 'João Silva' })
  @IsOptional() 
  @IsString() 
  name?: string;

  @ApiProperty({ 
    enum: Role, 
    example: Role.ADMIN,
    description: 'Nível de acesso do usuário' 
  })
  @IsOptional()
  @IsEnum(Role, { 
    message: 'A role deve ser um dos valores válidos do enum Role' 
  })
  role?: Role;
}
EOF

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
        role: data.role || 'USER',
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
# 📄 DTOs DE AUTH (Register, Login, Response)
#########################################

mkdir -p src/modules/auth/dto

cat << 'EOF' > src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'teste01@teste.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
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

echo -e "${GREEN}👉 Passo 5: Criando DTO para Refresh Token...${NC}"
cat << 'EOF' > src/modules/auth/dto/refresh-token.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1Ni...', 
    description: 'O refresh token recebido no login' 
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
EOF

#########################################
# 🎮 AUTH CONTROLLER (Caminhos Corrigidos)
#########################################

echo -e "${GREEN}👉 Passo 4: Configurando Controller...${NC}"
cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body.email, body.password, body.name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto, @Req() req: any) {
    return this.auth.login(body, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() body: RefreshTokenDto) {
    return this.auth.refresh(body.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout da sessão atual' })
  logout(@Req() req: any) {
    return this.auth.logout(req.user.sessionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  @ApiOperation({ summary: 'Logout de todos dispositivos' })
  logoutAll(@Req() req: any) {
    return this.auth.logoutAll(req.user.userId);
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
#########################################
# PASSO 3: LÓGICA DE NEGÓCIO (SERVICE)
#########################################
echo -e "${GREEN}👉 Passo 3: Configurando AuthService (Argon2 + Sessions)...${NC}"

cat << 'EOF' > src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, pass: string, name?: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new ConflictException('E-mail já cadastrado');

    const hashedPassword = await argon2.hash(pass);
    const user = await this.users.create({
      email,
      password: hashedPassword,
      name,
    });

    const session = await this.prisma.session.create({
  data: {
    userId: user.id,
    refreshToken: '',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

const tokens = await this.generateTokens(user, session.id);

const hashedRt = await argon2.hash(tokens.refreshToken);

await this.prisma.session.update({
  where: { id: session.id },
  data: { refreshToken: hashedRt },
});

return tokens;
  }

  async login(data: any, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    // 1. cria sessão
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: '',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const tokens = await this.generateTokens(user, session.id);

    const hashedRt = await argon2.hash(tokens.refreshToken);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: hashedRt },
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const sessions = await this.prisma.session.findMany({
        where: { userId: payload.sub, revoked: false },
      });

      for (const session of sessions) {
        const valid = await argon2.verify(session.refreshToken, refreshToken);

        if (valid) {
          const user = await this.users.findByEmail(payload.email);
          if (!user) throw new UnauthorizedException();

          await this.prisma.session.update({
            where: { id: session.id },
            data: { revoked: true },
          });

          const newSession = await this.prisma.session.create({
            data: {
              userId: user.id,
              refreshToken: '',
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          const tokens = await this.generateTokens(user, newSession.id);

          const hashedRt = await argon2.hash(tokens.refreshToken);

          await this.prisma.session.update({
            where: { id: newSession.id },
            data: { refreshToken: hashedRt },
          });

          return tokens;
        }
      }

      throw new UnauthorizedException('Sessão inválida');
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async logout(sessionId: number) {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });

    return { message: 'Logout realizado com sucesso' };
  }

  async logoutAll(userId: number) {
    await this.prisma.session.updateMany({
      where: { 
        userId: String(userId), 
        revoked: false },
      data: { revoked: true },
    });

    return { message: 'Logout de todos os dispositivos realizado' };
  }

  private async generateTokens(user: any, sessionId: number | null) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      sessionId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}
EOF

#########################################
# 🛡️ JWT STRATEGY (Validação do Token)
#########################################

log "🛡️ Criando JwtStrategy..."

mkdir -p src/modules/auth/strategies

cat << 'EOF' > src/modules/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET não definido no .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      sessionId: payload.sessionId,
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

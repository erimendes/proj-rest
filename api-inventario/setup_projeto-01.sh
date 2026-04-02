#!/bin/bash
set -e

PROJECT_NAME="api-inventario"

cd $PROJECT_NAME

echo "🔧 Criando módulo auth completo..."

#########################################
# 📁 Gerar estrutura base com Nest CLI
#########################################
npx nest g module auth --no-spec
npx nest g controller auth --no-spec
npx nest g service auth --no-spec
npx nest g guard auth/guards/jwt-auth --no-spec

#########################################
# 📁 Criar pastas adicionais
#########################################
mkdir -p src/auth/dto
mkdir -p src/auth/strategies
mkdir -p src/common/{decorators,guards}

#########################################
# 📄 DTOs
#########################################

echo "📄 Criando DTOs..."

cat << 'EOF' > src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
EOF

cat << 'EOF' > src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
EOF

#########################################
# 🔐 AuthService
#########################################

echo "🔐 Criando AuthService..."

cat << 'EOF' > src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data) {
    const exists = await this.userService.findByEmail(data.email);
    if (exists) throw new BadRequestException('User already exists');

    const hash = await argon2.hash(data.password);

    const user = await this.userService.create({
      ...data,
      password: hash,
    });

    return this.generateToken(user);
  }

  async login(data) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
EOF

#########################################
# 🎮 AuthController
#########################################

echo "🎮 Criando AuthController..."

cat << 'EOF' > src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }
}
EOF

#########################################
# 🧠 JWT Strategy
#########################################

echo "🧠 Criando JWT Strategy..."

cat << 'EOF' > src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
EOF

#########################################
# 🔐 JWT Guard
#########################################

echo "🔐 Criando JwtAuthGuard..."

cat << 'EOF' > src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
EOF

#########################################
# 🔑 Roles
#########################################

echo "🔑 Criando Roles decorator e guard..."

cat << 'EOF' > src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
EOF

cat << 'EOF' > src/common/guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role);
  }
}
EOF

#########################################
# 📦 AuthModule
#########################################

echo "📦 Criando AuthModule..."

cat << 'EOF' > src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
EOF

echo "🔧 Ajustando AppModule"
cat << 'EOF' > src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module.js'
import { UserModule } from './user/user.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
EOF

echo "🔧 Ajustando UserModule"
cat << 'EOF' > src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // 🔥 ESSENCIAL
})
export class UserModule {}
EOF

echo "🔧 Ajustando UserService"
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
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })
  }
}
EOF

echo "🔧 Ajustando UserController"
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

#########################################
# 🔥 Swagger (lembrete)
#########################################

echo "⚠️ Não esqueça de adicionar no main.ts:"
echo "👉 .addBearerAuth()"

#########################################
# ✅ Final
#########################################

echo "✅ AUTH COMPLETA CRIADA!"
echo "👉 Próximo passo:"
echo "1. Atualizar schema.prisma com Role"
echo "2. Rodar: npx prisma migrate dev"
echo "3. Importar AuthModule no AppModule"
#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-rest"
cd "$PROJECT_NAME"

echo "💣 SCRIPT-03: AUTH NÍVEL FINTECH"

#########################################
# 📁 Estrutura
#########################################
mkdir -p src/auth/{dto,strategies}
mkdir -p src/common/{decorators,guards}

#########################################
# 🧱 PRISMA (SESSION MODEL)
#########################################

echo "🧱 Atualizando schema.prisma..."

cat << 'EOF' >> prisma/schema.prisma

model Session {
  id           Int      @id @default(autoincrement())
  userId       Int
  user         User     @relation(fields: [userId], references: [id])

  refreshToken String
  userAgent    String?
  ip           String?

  createdAt    DateTime @default(now())
  expiresAt    DateTime
  revoked      Boolean  @default(false)
}
EOF

echo "👉 Rode depois: npx prisma migrate dev"

#########################################
# 📄 DTOs
#########################################

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
# 🔐 AuthService FINTECH
#########################################

cat << 'EOF' > src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(data, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException();

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException();

    const tokens = await this.generateTokens(user);

    const hashedRt = await argon2.hash(tokens.refreshToken);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRt,
        userAgent: meta.userAgent,
        ip: meta.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    const sessions = await this.prisma.session.findMany({
      where: { revoked: false },
    });

    for (const session of sessions) {
      const valid = await argon2.verify(session.refreshToken, refreshToken);

      if (valid) {
        // 🔥 ROTATION
        await this.prisma.session.update({
          where: { id: session.id },
          data: { revoked: true },
        });

        const user = await this.users.findById(session.userId);

        const tokens = await this.generateTokens(user);

        const newHash = await argon2.hash(tokens.refreshToken);

        await this.prisma.session.create({
          data: {
            userId: user.id,
            refreshToken: newHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });

        return tokens;
      }
    }

    // 🔥 POSSÍVEL ATAQUE → revoga tudo
    await this.prisma.session.updateMany({
      data: { revoked: true },
    });

    throw new UnauthorizedException('Token reuse detected');
  }

  async logout(sessionId: number) {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });
  }

  async logoutAll(userId: number) {
    await this.prisma.session.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }

  private async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}
EOF

#########################################
# 🎮 Controller FINTECH
#########################################

cat << 'EOF' > src/auth/auth.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto, @Req() req: any) {
    return this.auth.login(body, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  }

  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.auth.refresh(body.refreshToken);
  }

  @Post('logout')
  logout(@Body() body: { sessionId: number }) {
    return this.auth.logout(body.sessionId);
  }

  @Post('logout-all')
  logoutAll(@Body() body: { userId: number }) {
    return this.auth.logoutAll(body.userId);
  }
}
EOF

#########################################
# 🧠 O QUE VOCÊ GANHOU
#########################################

echo ""
echo "🔥 NÍVEL FINTECH ATIVADO:"
echo "✅ Refresh token rotation"
echo "✅ Proteção contra token roubado"
echo "✅ Sessões por dispositivo"
echo "✅ Logout por sessão"
echo "✅ Logout global"
echo ""
echo "👉 Próximo passo:"
echo "npx prisma migrate dev"
echo ""
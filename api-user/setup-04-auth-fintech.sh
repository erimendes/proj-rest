#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-moderna"
cd "$PROJECT_NAME"

# Cores para o terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}💣 SCRIPT-04: INICIANDO CONFIGURAÇÃO AUTH NÍVEL FINTECH${NC}"

#########################################
# PASSO 1: DEPENDÊNCIAS
#########################################
echo -e "${GREEN}👉 Passo 1: Instalando Argon2 para criptografia avançada...${NC}"
npm install argon2

#########################################
# PASSO 2: BANCO DE DADOS
#########################################
echo -e "${GREEN}👉 Passo 2: Atualizando schema.prisma com o modelo de Session...${NC}"

if ! grep -q "model Session" prisma/schema.prisma; then
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
  echo "✅ Modelo Session adicionado ao schema."
else
  echo "⚠️ Modelo Session já existe no schema, pulando..."
fi

#########################################
# PASSO 3: LÓGICA DE NEGÓCIO (SERVICE)
#########################################
echo -e "${GREEN}👉 Passo 3: Configurando AuthService (Argon2 + Refresh Tokens)...${NC}"

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

    return this.generateTokens(user);
  }

  async login(data: any, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

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
    try {
      const payload = await this.jwt.verifyAsync(refreshToken);
      const sessions = await this.prisma.session.findMany({
        where: { userId: payload.sub, revoked: false },
      });

      for (const session of sessions) {
        const valid = await argon2.verify(session.refreshToken, refreshToken);

        if (valid) {
          await this.prisma.session.update({
            where: { id: session.id },
            data: { revoked: true },
          });

          const user = await this.users.findByEmail(payload.email);
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
    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    await this.prisma.session.updateMany({
      where: { revoked: false },
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

  private async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync(payload, { expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }
}
EOF

#########################################
# PASSO 4: PONTOS DE ENTRADA (CONTROLLER)
#########################################
echo -e "${GREEN}👉 Passo 4: Atualizando AuthController com rotas de Refresh e Logout...${NC}"

cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
  refresh(@Body() body: { refreshToken: string }) {
    return this.auth.refresh(body.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() body: { sessionId: number }) {
    return this.auth.logout(body.sessionId);
  }
}
EOF

#########################################
# PASSO 5: SINCRONIZAÇÃO FINAL
#########################################
echo -e "${GREEN}👉 Passo 5: Sincronizando o Prisma com o Banco de Dados...${NC}"
npx prisma migrate dev --name add_sessions
npx prisma generate

echo -e "\n${BLUE}✅ TUDO PRONTO!${NC}"
echo -e "A autenticação agora usa ${GREEN}Argon2${NC} e possui ${GREEN}Refresh Token Rotation${NC}."
echo "Lembre-se: Usuários antigos com Bcrypt não conseguirão logar. Registre novos usuários."
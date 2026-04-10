#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-moderna"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}💣 SCRIPT-04: CONFIGURANDO AUTH COM REFRESH TOKEN ROTATION${NC}"

#########################################
# PASSO 1: DEPENDÊNCIAS
#########################################
echo -e "${GREEN}👉 Passo 1: Instalando Argon2...${NC}"
npm install argon2

#########################################
# PASSO 2: BANCO DE DADOS (CORREÇÃO AQUI)
#########################################
echo -e "${GREEN}👉 Passo 2: Atualizando schema.prisma (Relacionamento Bidirecional)...${NC}"

# 1. Adiciona o campo de sessões no modelo User (se ainda não existir)
if ! grep -q "sessions" prisma/schema.prisma; then
  # Procura o fechamento '}' do modelo User e insere a linha antes dele
  sed -i '/model User {/,/}/ s/}/  sessions  Session[]\n}/' prisma/schema.prisma
  echo "✅ Campo 'sessions' adicionado ao modelo User."
fi

# 2. Adiciona o modelo Session ao final do arquivo (se ainda não existir)
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
  echo "⚠️ Modelo Session já existe, pulando..."
fi

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

    return this.generateTokens(user);
  }

  async login(data: any, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = await this.generateTokens(user);
    const hashedRt = await argon2.hash(tokens.refreshToken);

    // Criamos a sessão no banco para permitir controle de logout/refresh
    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRt,
        userAgent: meta.userAgent,
        ip: meta.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    try {
      // 1. Validar o token e extrair o payload
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // 2. Buscar sessões ativas do usuário
      const sessions = await this.prisma.session.findMany({
        where: { userId: payload.sub, revoked: false },
      });

      for (const session of sessions) {
        // 3. Comparar o Refresh Token enviado com o hash do banco
        const valid = await argon2.verify(session.refreshToken, refreshToken);

        if (valid) {
          // 1. Busca o usuário
          const user = await this.users.findByEmail(payload.email);

          // 2. Verificação de segurança (Resolve o erro TS18047)
          if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
          }

          // 3. Invalida a sessão atual
          await this.prisma.session.update({
            where: { id: session.id },
            data: { revoked: true },
          });

          // 4. Gera novos tokens
          const newTokens = await this.generateTokens(user);
          
          // 5. Salva a nova sessão
          const newHashedRt = await argon2.hash(newTokens.refreshToken);
          await this.prisma.session.create({
            data: {
              userId: user.id, // Agora o TS sabe que 'user' não é null
              refreshToken: newHashedRt,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          return newTokens;
        }
      }
      
      throw new UnauthorizedException('Sessão inválida');

    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
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
# PASSO 4: CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 4: Configurando Controller...${NC}"
cat << 'EOF' > src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Req, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar e retornar tokens' })
  register(@Body() body: RegisterDto) {
    return this.auth.register(body.email, body.password, body.name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login com persistência de sessão' })
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
EOF

#########################################
# PASSO 5: DTO DE REFRESH TOKEN
#########################################
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
# PASSO 6: SINCRONIZAÇÃO INTELIGENTE
#########################################
echo -e "${GREEN}👉 Passo 6: Sincronizando Banco de Dados sem perda de dados...${NC}"

# 1. Localiza automaticamente a pasta de migração inicial para resolver o conflito
INIT_MIGRATION=$(ls prisma/migrations | grep _init | head -n 1)

if [ -n "$INIT_MIGRATION" ]; then
  echo -e "📦 Resolvendo migração encontrada: ${BLUE}$INIT_MIGRATION${NC}"
  # Marca como aplicada para evitar o erro de 'tabela já existe'
  npx prisma migrate resolve --applied "$INIT_MIGRATION" || echo "⚠️ Migração já estava resolvida, pulando..."
else
  echo -e "⚠️ Nenhuma migração '_init' encontrada para resolver."
fi

# 2. Sincroniza o Schema (Cria a tabela Session e atualiza User)
# O --accept-data-loss não existe no migrate dev, mas o db push aceita --accept-data-loss 
# se houver algo destrutivo. Como estamos apenas ADICIONANDO, ele é seguro.
echo -e "${GREEN}🔄 Executando DB PUSH para injetar novas tabelas...${NC}"
npx prisma db push --skip-generate

# 3. Gera o novo Client com as novas tipagens (Session)
echo -e "${GREEN}⚙️ Gerando Prisma Client atualizado...${NC}"
npx prisma generate

echo -e "\n${BLUE}✅ SINCRONIZAÇÃO CONCLUÍDA!${NC}"

#########################################
# PASSO 5: MIGRATE & GENERATE
#########################################
echo -e "${GREEN}👉 Passo 5: Sincronizando Banco de Dados...${NC}"
npx prisma migrate dev --name add_sessions
npx prisma generate

echo -e "\n${BLUE}✅ SCRIPT-04 FINALIZADO COM SUCESSO!${NC}"
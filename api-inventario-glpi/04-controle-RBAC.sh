#!/usr/bin/env bash
set -euo pipefail

# Nome do projeto (consistente com scripts anteriores)
PROJECT_NAME="${PROJECT_NAME:-minha-api-glpi}"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${BLUE}==> $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

# Verifica diretório
if [ ! -d "$PROJECT_NAME" ]; then
    error "O diretório '$PROJECT_NAME' não existe."
fi

cd "$PROJECT_NAME"

echo -e "${BLUE}🛡️ SCRIPT-05: CONFIGURANDO PERMISSÕES DE ADMIN (RBAC)${NC}"

#########################################
# PASSO 1: CRIAR DIRETÓRIOS
#########################################
log "Criando estrutura de pastas..."
echo -e "${GREEN}👉 Passo 1: Criando estrutura de pastas...${NC}"
mkdir -p src/common/decorators src/common/guards src/modules/admin/dto

#########################################
# PASSO 2: DECORADOR @Roles
#########################################
echo -e "${GREEN}👉 Passo 2: Criando decorador @Roles...${NC}"
cat << 'EOF' > src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../generated/prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
EOF

#########################################
# PASSO 3: ROLES GUARD (O MOTOR DE BUSCA)
#########################################
echo -e "${GREEN}👉 Passo 3: Criando RolesGuard...${NC}"
cat << 'EOF' > src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../generated/prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Populado pelo JwtStrategy

    if (!user || !user.role) {
      throw new ForbiddenException('Acesso negado: Perfil de usuário não identificado');
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acesso negado: Requer nível ${requiredRoles.join(' ou ')}`
      );
    }

    return true;
  }
}
EOF

#########################################
# PASSO 4: ADMIN CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 4: Criando AdminController com Proteção...${NC}"
cat << 'EOF' > src/modules/admin/admin.controller.ts
import { Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Dados sensíveis (Apenas ADMIN)' })
  getAdminData() {
    return { 
      message: 'Bem-vindo ao painel de controle.',
      data: this.adminService.findAll()
    };
  }

  @Get('manager')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Dados de gerência (ADMIN e MANAGER)' })
  getManagerData() {
    return { 
      message: 'Bem-vindo ao painel de gerência.',
      data: 'Relatórios de vendas e equipe.'
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }
}
EOF

#########################################
# PASSO 5: ADMIN SERVICE
#########################################
echo -e "${GREEN}👉 Passo 5: Criando AdminService...${NC}"
cat << 'EOF' > src/modules/admin/admin.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  create() { return 'Ação: Adicionar novo administrador'; }
  findAll() { return 'Ação: Listar todos os administradores'; }
  findOne(id: number) { return `Ação: Ver detalhes do admin #${id}`; }
  update(id: number) { return `Ação: Atualizar admin #${id}`; }
  remove(id: number) { return `Ação: Remover admin #${id}`; }
}
EOF

#########################################
# PASSO 6: ADMIN MODULE
#########################################
echo -e "${GREEN}👉 Passo 6: Criando AdminModule...${NC}"
cat << 'EOF' > src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
EOF

#########################################
# PASSO 7: APP MODULE
#########################################
echo -e "${GREEN}👉 Passo 7: Atualizando AppModule...${NC}"
cat << 'EOF' > src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
EOF

#########################################
# PASSO 8: JWT STRATEGY
#########################################
echo -e "${GREEN}👉 Passo 8: Criando JwtStrategy...${NC}"
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
# PASSO 9: REFRESH STRATEGY
#########################################
echo -e "${GREEN}👉 Passo 9: Criando RefreshStrategy...${NC}"
cat << 'EOF' > src/modules/auth/strategies/refresh.strategy.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt') {}
EOF

echo -e "\n${BLUE}✅ SCRIPT FINALIZADO COM SUCESSO!${NC}"

echo -e "\n${BLUE}✅ TUDO PRONTO!${NC}"
echo -e "O módulo Admin foi criado com ${GREEN}RBAC (Role Based Access Control)${NC}."
echo -e "Lembre-se de importar o ${BLUE}AdminModule${NC} no seu ${BLUE}app.module.ts${NC}."
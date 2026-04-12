#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🪑 SCRIPT-07: IMPLEMENTANDO GESTÃO DE MESAS${NC}"

#########################################
# PASSO 1: GERAR MÓDULO VIA NEST CLI
#########################################
echo -e "${GREEN}👉 Passo 1: Gerando módulo, controller e service de Mesas...${NC}"
npx nest g module modules/table
npx nest g controller modules/table --no-spec
npx nest g service modules/table --no-spec

#########################################
# PASSO 2: TABLE - SERVICE
#########################################
echo -e "${GREEN}👉 Passo 2: Configurando TableService...${NC}"
cat << 'EOF' > src/modules/table/table.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TableStatus } from '../../generated/prisma/client';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async create(number: number) {
    const exists = await this.prisma.table.findUnique({ where: { number } });
    if (exists) throw new ConflictException(`A mesa número ${number} já existe.`);
    
    return this.prisma.table.create({ data: { number } });
  }

  async findAll() {
    return this.prisma.table.findMany({ orderBy: { number: 'asc' } });
  }

  async findFree() {
    return this.prisma.table.findMany({ where: { status: TableStatus.FREE } });
  }

  async updateStatus(id: string, status: TableStatus) {
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    
    return this.prisma.table.update({
      where: { id },
      data: { status }
    });
  }

  async remove(id: string) {
    return this.prisma.table.delete({ where: { id } });
  }
}
EOF

#########################################
# PASSO 3: TABLE - CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 3: Configurando TableController...${NC}"
cat << 'EOF' > src/modules/table/table.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TableService } from './table.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, TableStatus } from '../../generated/prisma/client';
import { CreateTableDto } from './dto/create-table.dto';

@ApiTags('tables')
@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  create(@Body() createTableDto: CreateTableDto) { // Use o DTO aqui
    return this.tableService.create(createTableDto.number); // Acesse o .number
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as mesas' })
  findAll() {
    return this.tableService.findAll();
  }

  @Get('free')
  @ApiOperation({ summary: 'Listar apenas mesas livres' })
  findFree() {
    return this.tableService.findFree();
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  @ApiOperation({ summary: 'Alterar status da mesa (Admin/Manager/Garçom)' })
  updateStatus(@Param('id') id: string, @Body('status') status: TableStatus) {
    return this.tableService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remover mesa (Apenas Admin)' })
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
EOF

#########################################
# PASSO 4: TABLE - DTO
#########################################
echo -e "${GREEN}👉 Passo 4: Configurando TableDTO...${NC}"
cat << 'EOF' > src/modules/table/dto/create-table.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 1, description: 'O número da mesa' })
  @IsNumber()    // <--- ESSENCIAL: Sem isso, a 'whitelist' remove o campo
  @IsNotEmpty()  // <--- Garante que o número não seja enviado vazio
  number!: number;
}
EOF

#########################################
# PASSO 5: SINCRONIZAÇÃO
#########################################
echo -e "${GREEN}👉 Passo 5: Sincronizando banco...${NC}"
npx prisma db push
npx prisma generate

echo -e "\n${BLUE}✅ MÓDULO DE MESAS INSTALADO!${NC}"
echo -e "Próximo passo: ${GREEN}Script 08 - O Motor de Pedidos (Orders)${NC}"
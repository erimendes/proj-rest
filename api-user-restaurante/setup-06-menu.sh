#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📖 SCRIPT-06: IMPLEMENTANDO MÓDULO DE CARDÁPIO${NC}"

#########################################
# PASSO 1: GERAR MÓDULOS VIA NEST CLI
#########################################
echo -e "${GREEN}👉 Passo 1: Gerando módulos, controllers e services...${NC}"
npx nest g module modules/category
npx nest g controller modules/category --no-spec
npx nest g service modules/category --no-spec

npx nest g module modules/product
npx nest g controller modules/product --no-spec
npx nest g service modules/product --no-spec

#########################################
# PASSO 2: CATEGORY - SERVICE & CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 2: Configurando Categoria...${NC}"

# Service de Categoria
cat << 'EOF' > src/modules/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.category.create({ data: { name } });
  }

  async findAll() {
    return this.prisma.category.findMany({ include: { products: true } });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }

  async update(id: string, name: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }
}
EOF

# Controller de Categoria
cat << 'EOF' > src/modules/category/category.controller.ts
import { Controller, Get, Post, Body, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Criar nova categoria (Admin/Manager)' })
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias e seus produtos' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Atualizar nome da categoria' })
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.categoryService.update(id, name);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remover categoria (Apenas Admin)' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

}
EOF

#########################################
# PASSO 3: PRODUCT - SERVICE & CONTROLLER
#########################################
echo -e "${GREEN}👉 Passo 3: Configurando Produtos...${NC}"

# Service de Produto
cat << 'EOF' > src/modules/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const categoryExists = await this.prisma.category.findUnique({ where: { id: data.categoryId } });
    if (!categoryExists) throw new NotFoundException('Categoria não encontrada');
    
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  async update(id: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

}
EOF

# Controller de Produto
cat << 'EOF' > src/modules/product/product.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Query, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Cadastrar produto (Admin/Manager)' })
  create(@Body() data: { name: string, price: number, categoryId: string, description?: string }) {
    return this.productService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) return this.productService.findByCategory(categoryId);
    return this.productService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Atualizar dados do produto (Preço, nome, etc)' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Geralmente apenas o Admin deleta produtos permanentemente
  @ApiOperation({ summary: 'Remover produto do cardápio' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
EOF

#########################################
# PASSO 4: SINCRONIZAÇÃO FINAL
#########################################
echo -e "${GREEN}👉 Passo 4: Sincronizando banco e tipagens...${NC}"
npx prisma db push
npx prisma generate

echo -e "\n${BLUE}✅ MÓDULO DE CARDÁPIO INSTALADO COM SUCESSO!${NC}"
echo -e "Próximo passo sugerido: ${GREEN}Script 07 - Gestão de Mesas${NC}"
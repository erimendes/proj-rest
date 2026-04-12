#!/bin/bash
# Nome: 09-fix-backend-dtos.sh
# Objetivo: Implementar DTOs e corrigir Services/Controllers para Categories e Products
APP_NAME="restaurante01" # Ajuste para o nome da sua pasta de backend se for diferente

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🛠️ Refatorando Backend: Implementando DTOs e Validações..."

# 1. Criar pastas de DTO se não existirem
mkdir -p src/modules/products/dto

# 2. Criar CreateProductDto
cat > src/modules/products/dto/create-product.dto.ts <<'EOF'
import { IsString, IsNotEmpty, IsNumber, IsUUID, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Hambúrguer Artesanal' })
  @IsString()
  @IsNotEmpty()
  name!: string; // Adicionado o '!'

  @ApiProperty({ example: 35.90 })
  @IsNumber()
  @Min(0)
  price!: number; // Adicionado o '!'

  @ApiProperty({ example: 'uuid-da-categoria' })
  @IsUUID('4')
  @IsNotEmpty()
  categoryId!: string; // Adicionado o '!'

  @ApiProperty({ required: false })
  @IsString()
  description?: string; // Aqui não precisa de '!', pois o '?' já indica que pode ser undefined
}
EOF

# 5. Corrigir ProductService (Tipado com DTO)
cat > src/modules/products/product.service.ts <<'EOF'
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto'; // Importe seu DTO aqui

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    // Como usamos o ValidationPipe no main.ts e o DTO no Controller, 
    // o 'data' e o 'data.categoryId' já chegam validados aqui.

    // 1. Verificação de Categoria (Regra de Negócio)
    const categoryExists = await this.prisma.category.findUnique({ 
      where: { id: data.categoryId } 
    });
    
    if (!categoryExists) {
      throw new NotFoundException('A categoria informada não existe');
    }
    
    // 2. Criação no banco
    try {
      return await this.prisma.product.create({ 
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
        }
      });
    } catch (error) {
      // Captura erros de banco (ex: violação de constraint)
      throw new BadRequestException('Não foi possível criar o produto. Verifique os dados.');
    }
  }

  async findAll() {
    return this.prisma.product.findMany({ 
      include: { category: true },
      orderBy: { createdAt: 'desc' } // Opcional: produtos mais novos primeiro
    });
  }

  async findByCategory(categoryId: string) {
    if (!categoryId) throw new BadRequestException('ID da categoria é obrigatório');
    
    return this.prisma.product.findMany({ 
      where: { categoryId },
      include: { category: true }
    });
  }

  async update(id: string, data: Partial<CreateProductDto>) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    
    // Se estiver tentando mudar a categoria, valida se a nova existe
    if (data.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({ 
        where: { id: data.categoryId } 
      });
      if (!categoryExists) throw new NotFoundException('Nova categoria não encontrada');
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // É boa prática verificar a existência antes de deletar para dar um 404 claro
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado para remoção');

    return this.prisma.product.delete({ where: { id } });
  }
}
EOF

echo "✅ Atualizando Controllers para usar DTOs..."
cat > src/modules/products/product.controller.ts <<'EOF'
import { Controller, Get, Post, Body, Param, UseGuards, Query, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';
import { CreateProductDto } from './dto/create-product.dto'; // Importe o DTO

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Cadastrar produto (Admin/Manager)' })
  // O uso do DTO aqui habilita o preenchimento automático no Swagger
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filtrar por ID da categoria' })
  findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) return this.productService.findByCategory(categoryId);
    return this.productService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Atualizar dados do produto' })
  // Usamos Partial para permitir atualizações parciais
  update(@Param('id') id: string, @Body() updateData: Partial<CreateProductDto>) {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remover produto do cardápio' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
EOF

echo "✅ DTOs criados e Services atualizados!"
echo "🚀 Dica: Lembre-se de atualizar os Controllers para usar os novos DTOs."
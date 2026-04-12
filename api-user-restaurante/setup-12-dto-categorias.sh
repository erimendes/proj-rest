#!/bin/bash
# Nome: 09-fix-backend-dtos.sh
# Objetivo: Implementar DTOs e corrigir Services/Controllers para Categories e Products
APP_NAME="restaurante01" # Ajuste para o nome da sua pasta de backend se for diferente

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🛠️ Refatorando Backend: Implementando DTOs e Validações..."

# 1. Criar pastas de DTO se não existirem
mkdir -p src/modules/categories/dto
mkdir -p src/modules/products/dto

# 2. Criar CreateCategoryDto
cat > src/modules/categories/dto/create-category.dto.ts <<'EOF'
// src/modules/categories/dto/create-category.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Bebidas',
    description: 'O nome da categoria de produtos',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name!: string; // O '!' resolve o erro de inicialização
}
EOF

# 3. Criar CreateProductDto
cat > src/modules/products/dto/create-product.dto.ts <<'EOF'
import { IsString, IsNotEmpty, IsNumber, IsUUID, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Hambúrguer Artesanal', description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @ApiProperty({ example: 'Pão brioche, carne 180g, queijo cheddar', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: 35.90, description: 'Preço de venda' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'uuid-da-categoria', description: 'ID da categoria vinculada' })
  @IsUUID('4', { message: 'O ID da categoria deve ser um UUID válido' })
  @IsNotEmpty()
  categoryId!: string;
}
EOF

# 4. Corrigir CategoryService (Usando findFirst para evitar erro de tipagem)
cat > src/modules/categories/category.service.ts <<'EOF'
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('O nome da categoria é obrigatório');
    }

    // Usamos findFirst aqui para evitar o erro de tipagem caso o campo 'name' 
    // no schema.prisma ainda não tenha o @unique
    const categoryExists = await this.prisma.category.findFirst({
      where: { name: name.trim() }
    });

    if (categoryExists) {
      throw new ConflictException('Já existe uma categoria com este nome');
    }

    return this.prisma.category.create({ 
      data: { name: name.trim() } 
    });
  }

  async findAll() {
    return this.prisma.category.findMany({ 
      include: { products: true },
      orderBy: { name: 'asc' }
    });
  }

  async update(id: string, name: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Categoria não encontrada');

    if (!name || name.trim().length === 0) {
      throw new BadRequestException('O novo nome da categoria não pode ser vazio');
    }

    return this.prisma.category.update({
      where: { id },
      data: { name: name.trim() },
    });
  }

  async remove(id: string) {
    // Verificamos o ID único
    const category = await this.prisma.category.findUnique({ 
      where: { id },
      include: { 
        _count: { 
          select: { products: true } 
        } 
      } 
    });

    if (!category) throw new NotFoundException('Categoria não encontrada');

    if (category._count.products > 0) {
      throw new BadRequestException('Não é possível excluir uma categoria que possui produtos vinculados');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
EOF

# 5. Corrigir ProductService (Tipado com DTO)
cat > src/modules/products/product.service.ts <<'EOF'
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    const categoryExists = await this.prisma.category.findUnique({ 
      where: { id: data.categoryId } 
    });
    
    if (!categoryExists) {
      throw new NotFoundException('A categoria informada não existe');
    }
    
    return this.prisma.product.create({ 
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
      }
    });
  }

  async findAll() {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  async update(id: string, data: Partial<CreateProductDto>) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return this.prisma.product.delete({ where: { id } });
  }
}
EOF

# 6. Corrigir CategoryController para usar DTOs (Recomendo criar UpdateCategoryDto, mas para simplificar, usaremos o mesmo)
cat > src/modules/categories/category.controller.ts <<'EOF'
import { Controller, Get, Post, Body, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto'; // Importe seu DTO

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Criar nova categoria (Admin/Manager)' })
  // Alterado para usar o DTO completo
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto.name);
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
  // Também recomendo usar um DTO aqui, mas para simplificar:
  update(@Param('id') id: string, @Body() updateData: CreateCategoryDto) {
    return this.categoryService.update(id, updateData.name);
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

echo "✅ DTOs criados e Services atualizados!"
echo "🚀 Dica: Lembre-se de atualizar os Controllers para usar os novos DTOs."
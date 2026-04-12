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
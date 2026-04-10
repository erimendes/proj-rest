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

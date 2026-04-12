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
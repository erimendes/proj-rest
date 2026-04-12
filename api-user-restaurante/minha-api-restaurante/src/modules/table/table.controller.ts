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

// src/table/table.controller.ts
import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { TableService } from './table.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id/reset')
  async resetTable(@Param('id') id: string) {
    // Chamamos o método do SERVICE, não do Prisma direto
    return this.tableService.resetTable(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus } from '../../generated/prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar pedido' })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const userId = req.user.id || req.user.sub;
    return this.orderService.create(userId, createOrderDto);
  }

  @Post('add-item')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Adicionar item a pedido existente' })
  async addItem(@Body() addItemDto: AddItemDto) {
    return this.orderService.addItem(addItemDto);
  }

  // CORREÇÃO: Rota que o Frontend estava chamando e dando 404
  @Get('pending')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar pedidos abertos' })
  async listPending() {
    const all = await this.orderService.findAll();
    // Filtra apenas o que não está finalizado
    return all.filter(order => order.status === 'PENDING' || order.status === 'PREPARING');
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER, Role.CHEF)
  async updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.orderService.updateStatus(id, status);
  }
}
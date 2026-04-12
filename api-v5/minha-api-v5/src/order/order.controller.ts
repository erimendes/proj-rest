// src/order/order.controller.ts
import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { AddItemDto } from './dto/add-item.dto.js';
import { OrderStatus } from '../generated/prisma/enums.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Post('add-item') // 👈 Agora a rota /orders/add-item existe!
  addItem(@Body() dto: AddItemDto) {
    return this.service.addItem(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Adicione este método ao seu src/order/order.controller.ts

  @Patch(':id/finish')
  finishOrder(@Param('id') id: string) {
    return this.service.finishOrder(id);
  }

 @Patch(':id/status')
  // Note que removemos o ('status') de dentro do @Body
  updateStatus(
    @Param('id') id: string, 
    @Body() dto: UpdateStatusDto // 👈 Aqui ele valida o objeto inteiro
  ) {
    // Agora passamos dto.status para o service
    return this.service.updateStatus(id, dto.status);
  }

  @Get('table/:tableId')
  findOpenByTable(@Param('tableId') tableId: string) {
    return this.service.findOpenByTable(tableId);
  }

  @Delete('item/:orderItemId')
  removeItem(@Param('orderItemId') orderItemId: string) {
    return this.service.removeItem(orderItemId);
  }

  @Get('reports/sales')
  getSalesReport() {
    return this.service.getSalesReport();
  }

  @Get('kitchen/queue')
  getKitchenQueue() {
    return this.service.getKitchenQueue();
  }

  @Patch(':id/close')
  async closeOrder(@Param('id') id: string) {
    return this.service.closeOrder(id);
  }

  // Adicione isto no seu OrderController
  @Patch('item/:id/ready')
  async markItemAsReady(@Param('id') id: string) {
    return this.service.markItemAsReady(id);
  }

  @Get(':id/bill')
  async getBill(@Param('id') id: string) {
    return this.service.getFormattedBill(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(id);
  // }
}
import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, OrderStatus } from '../../generated/prisma/client';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  create(@Req() req: any, @Body('tableId') tableId: string) {
    return this.orderService.create(req.user.userId, tableId);
  }

  @Post(':id/items')
  @Roles(Role.ADMIN, Role.MANAGER, Role.WAITER)
  addItem(@Param('id') id: string, @Body() data: { productId: string, quantity: number, observation?: string }) {
    return this.orderService.addItem(id, data.productId, data.quantity, data.observation);
  }

  @Get('kitchen/pending')
  @Roles(Role.ADMIN, Role.CHEF)
  @ApiOperation({ summary: 'Listar pedidos pendentes para a cozinha (Admin/Chef)' })
  listPending() {
    return this.orderService.listPending();
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.MANAGER, Role.CHEF, Role.WAITER)
  @ApiOperation({ summary: 'Alterar status do pedido (Fluxo de trabalho)' })
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}

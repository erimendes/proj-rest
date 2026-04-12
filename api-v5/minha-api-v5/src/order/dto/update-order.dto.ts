// src/order/dto/update-order.dto.ts
import { IsEnum, IsOptional } from 'class-validator';

enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
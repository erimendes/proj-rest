// src/order/dto/create-order.dto.ts
import { IsUUID, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  tableId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
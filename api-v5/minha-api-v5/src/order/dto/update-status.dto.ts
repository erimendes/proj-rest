// src/order/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums.js';

export class UpdateStatusDto {
  @IsEnum(OrderStatus, {
    message: 'Status inválido. Use PENDING, PREPARING, READY ou DELIVERED',
  })
  status: OrderStatus;
}
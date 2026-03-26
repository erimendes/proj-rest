// src/order/dto/add-item.dto.ts
import { IsString, IsInt, IsUUID, IsOptional, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional() // O garçom nem sempre vai escrever algo
  observation?: string; // 👈 Adicione esta linha!
}
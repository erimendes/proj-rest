import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ example: 'uuid-do-produto' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-da-mesa' })
  @IsUUID()
  @IsNotEmpty()
  tableId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

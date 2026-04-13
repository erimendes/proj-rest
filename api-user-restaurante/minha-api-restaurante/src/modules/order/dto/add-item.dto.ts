import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class AddItemDto {
  @ApiProperty()
  @IsUUID()
  orderId: string;

  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observation?: string;
}

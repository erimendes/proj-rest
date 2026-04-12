import { IsString, IsNotEmpty, IsNumber, IsUUID, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Hambúrguer Artesanal' })
  @IsString()
  @IsNotEmpty()
  name!: string; // Adicionado o '!'

  @ApiProperty({ example: 35.90 })
  @IsNumber()
  @Min(0)
  price!: number; // Adicionado o '!'

  @ApiProperty({ example: 'uuid-da-categoria' })
  @IsUUID('4')
  @IsNotEmpty()
  categoryId!: string; // Adicionado o '!'

  @ApiProperty({ required: false })
  @IsString()
  description?: string; // Aqui não precisa de '!', pois o '?' já indica que pode ser undefined
}
// src/modules/categories/dto/create-category.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Bebidas',
    description: 'O nome da categoria de produtos',
  })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name!: string; // O '!' resolve o erro de inicialização
}
// src/category/dto/create-category.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name: string;
}
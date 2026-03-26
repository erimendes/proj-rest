// src/post/dto/create-post.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string; // Este é o campo que o erro dizia estar faltando

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  // Se o post precisar de um autor na criação:
  @IsOptional()
  authorId?: number;
}

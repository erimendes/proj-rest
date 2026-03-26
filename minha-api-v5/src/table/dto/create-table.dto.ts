// src/table/dto/create-table.dto.ts
import { IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum TableStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsEnum(TableStatus)
  @IsOptional()
  status?: TableStatus;
}
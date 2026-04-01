// src/user/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
// Importe o Role do Prisma (ajuste o caminho conforme sua estrutura)
import { Role } from '../../generated/prisma/client.js'; 

export class CreateUserDto {
  @ApiProperty({ example: 'joao.silva' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  departmentId: number;

  @ApiProperty({ example: 'João' })
  @IsString()
  @IsOptional()
  name?: string;

  // ESTA É A PARTE QUE CORRIGE O SWAGGER
  @ApiPropertyOptional({ 
    enum: Role, 
    example: Role.USER,
    description: 'Nível de permissão do usuário' 
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/client.js'; // Importe o Role do Prisma (ajuste o caminho conforme sua estrutura)

export class RegisterDto {
  @ApiProperty({ example: 'joao.silva', description: 'Nome de usuário único' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @ApiProperty({ example: 'Senha@123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 1, description: 'ID do departamento' })
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty({ example: 'João', required: false, nullable: true })
  @IsOptional()
  @IsString()
  name?: string | null; // Aceita null para bater com o Prisma

  @ApiProperty({ enum: Role, example: Role.USER })
  @IsOptional()
  @IsEnum(Role) // Valida se a string enviada bate com o Enum
  role?: Role;  // Mude de string para Role
}

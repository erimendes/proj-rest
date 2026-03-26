// src/auth/dto/register.dto.ts
import { IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // agora o role é aceito
}

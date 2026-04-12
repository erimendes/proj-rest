// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
  CHEF = 'CHEF'
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
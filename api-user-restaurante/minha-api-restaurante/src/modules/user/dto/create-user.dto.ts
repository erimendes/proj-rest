import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Importe o Enum do Prisma para garantir que as opções sejam idênticas
import { Role } from '../../../generated/prisma/client'; 

export class CreateUserDto {
  @ApiProperty({ example: 'teste01@teste.com' }) 
  @IsEmail() 
  email!: string;

  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password!: string;

  @ApiProperty({ example: 'João Silva' })
  @IsOptional() 
  @IsString() 
  name?: string;

  // ADICIONE ESTE CAMPO:
  @ApiProperty({ 
    enum: Role, 
    example: 'ADMIN',
    description: 'Nível de acesso do usuário' 
  })
  @IsOptional() // Ou @IsNotEmpty() se quiser obrigar a escolha
  @IsEnum(Role, { message: 'A role deve ser um dos valores: USER, ADMIN, MANAGER, WAITER, CHEF' })
  role?: Role;
}
import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client'; 

export class CreateUserDto {
  @ApiProperty({ example: 'teste01@teste.com' }) 
  @IsEmail() 
  email!: string;

  @ApiProperty({ example: '123456' }) 
  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password!: string;

  @ApiProperty({ example: 'João Silva' })
  @IsOptional() 
  @IsString() 
  name?: string;

  @ApiProperty({ 
    enum: Role, 
    example: Role.ADMIN,
    description: 'Nível de acesso do usuário' 
  })
  @IsOptional()
  @IsEnum(Role, { 
    message: 'A role deve ser um dos valores válidos do enum Role' 
  })
  role?: Role;
}

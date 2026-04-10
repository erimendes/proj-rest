import { IsEmail, IsString, MinLength, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'teste01@teste.com' }) 
  @IsEmail() 
  email: string;

  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password: string;

  @ApiProperty({ example: 'string' })
  @IsOptional() 
  @IsString() 
  name?: string;
}

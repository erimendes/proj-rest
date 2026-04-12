import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 1, description: 'O número da mesa' })
  @IsNumber()    // <--- ESSENCIAL: Sem isso, a 'whitelist' remove o campo
  @IsNotEmpty()  // <--- Garante que o número não seja enviado vazio
  number!: number;
}
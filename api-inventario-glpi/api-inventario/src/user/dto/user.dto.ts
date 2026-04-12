// src/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/browser.js';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'joao.silva' })
  username: string;

  @ApiProperty({ example: 'João Silva' })
  fullName: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'João', required: false, nullable: true })
  name: string | null; // 🔥 IMPORTANTE: Use 'null' para bater com o Prisma

  @ApiProperty({ example: 1 })
  departmentId: number;

  @ApiProperty({ example: '2026-03-31T22:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ enum: Role, example: Role.USER })
  role: Role;
}

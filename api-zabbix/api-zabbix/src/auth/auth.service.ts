// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Role } from 'src/generated/prisma/enums.js';
import { RegisterDto } from './dto/register.dto.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      // Tratando o campo 'name' para remover o 'null' caso exista
      const userData: CreateUserDto = {
        ...data,
        name: data.name ?? undefined, // Se for null ou undefined, vira undefined
      };
      const user = await this.userService.create(userData);
      return await this.generateToken(user);
    } catch (error) {
      console.error("ERRO NO REGISTER:", error); // Isso vai mostrar o erro real no seu terminal do VS Code
      throw error; 
    }
  }

  async login(data) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // Adicionamos o await aqui também
    return await this.generateToken(user);
  }

  // Mudamos para async para usar o signAsync
  private async generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      // signAsync é a versão moderna e não-bloqueante
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

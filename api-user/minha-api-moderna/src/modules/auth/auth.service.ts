import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
  // TESTE DE SANIDADE
  const testeSenha = "senha123";
  const testeHash = await bcrypt.hash(testeSenha, 10);
  const testeMatch = await bcrypt.compare(testeSenha, testeHash);
  console.log('Teste de Sanidade Bcrypt:', testeMatch); // ISSO TEM QUE SER TRUE
  const user = await this.userService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  // --- LOGS DE DIAGNÓSTICO ---
  console.log('1. Senha pura (login):', `|${pass}|`); // Os pipes ajudam a ver espaços invisíveis
  console.log('2. Hash do banco:', `|${user.password}|`);
  console.log('3. Tamanho do Hash:', user.password.length); 

  const isMatch = await bcrypt.compare(pass, user.password);
  console.log('4. Resultado do compare:', isMatch);
  // ---------------------------

  if (!isMatch) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  const payload = { sub: user.id, email: user.email, role: user.role };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}

  async register(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('Email já registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      email,
      password: hashedPassword, // A senha será hasheada no Prisma Middleware
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
  
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

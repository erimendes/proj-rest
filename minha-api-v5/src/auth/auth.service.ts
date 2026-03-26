// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,     // 400
  UnauthorizedException,   // 401
  ForbiddenException,      // 403
  NotFoundException,       // 404
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { PasswordService } from '../common/crypto/password.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.userService.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser(data);

    return { id: user.id, email: user.email };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.passwordService.compare(
      data.password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 🔹 Aqui adicionamos a role no payload
    const payload = { sub: user.id, email: user.email, role: user.role };

    return { access_token: this.jwtService.sign(payload) };
  }
}

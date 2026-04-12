// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret', // 🔥 depois coloca no .env
    });
  }

  async validate(payload: any) {
    // 🔹 Retorna user completo para request.user
    // Assim, RolesGuard consegue ler user.role
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}

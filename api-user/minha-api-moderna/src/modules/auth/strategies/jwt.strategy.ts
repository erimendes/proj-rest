import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    
    // Erro comum: Se o secret estiver vazio, o Passport quebra a aplicação
    if (!secret) {
      throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Se o payload não tiver o 'sub' (ID do usuário), o token é inválido
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token inválido ou malformado');
    }

    // O que retornamos aqui fica disponível em 'req.user'
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
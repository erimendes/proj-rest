import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, pass: string, name?: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new ConflictException('E-mail já cadastrado');

    // const hashedPassword = await argon2.hash(pass);
    const user = await this.users.create({
      email,
      password: pass, // O hashing agora é feito dentro do UserService para centralizar a lógica de usuário
      name,
    });

    return this.generateTokens(user);
  }

  async login(data: any, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = await this.generateTokens(user);
    const hashedRt = await argon2.hash(tokens.refreshToken);

    // Criamos a sessão no banco para permitir controle de logout/refresh
    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRt,
        userAgent: meta.userAgent,
        ip: meta.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    try {
      // 1. Validar o token e extrair o payload
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // 2. Buscar sessões ativas do usuário
      const sessions = await this.prisma.session.findMany({
        where: { userId: payload.sub, revoked: false },
      });

      for (const session of sessions) {
        // 3. Comparar o Refresh Token enviado com o hash do banco
        const valid = await argon2.verify(session.refreshToken, refreshToken);

        if (valid) {
          // 1. Busca o usuário
          const user = await this.users.findByEmail(payload.email);

          // 2. Verificação de segurança (Resolve o erro TS18047)
          if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
          }

          // 3. Invalida a sessão atual
          await this.prisma.session.update({
            where: { id: session.id },
            data: { revoked: true },
          });

          // 4. Gera novos tokens
          const newTokens = await this.generateTokens(user);
          
          // 5. Salva a nova sessão
          const newHashedRt = await argon2.hash(newTokens.refreshToken);
          await this.prisma.session.create({
            data: {
              userId: user.id, // Agora o TS sabe que 'user' não é null
              refreshToken: newHashedRt,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          return newTokens;
        }
      }
      
      throw new UnauthorizedException('Sessão inválida');

    } catch (e) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync(payload, { expiresIn: '7d' }),
    ]);
    return { accessToken, refreshToken };
  }
}

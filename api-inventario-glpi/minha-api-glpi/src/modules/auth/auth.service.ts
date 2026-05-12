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

    const hashedPassword = await argon2.hash(pass);
    const user = await this.users.create({
      email,
      password: hashedPassword,
      name,
    });

    const session = await this.prisma.session.create({
  data: {
    userId: user.id,
    refreshToken: '',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

const tokens = await this.generateTokens(user, session.id);

const hashedRt = await argon2.hash(tokens.refreshToken);

await this.prisma.session.update({
  where: { id: session.id },
  data: { refreshToken: hashedRt },
});

return tokens;
  }

  async login(data: any, meta: { ip?: string; userAgent?: string }) {
    const user = await this.users.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await argon2.verify(user.password, data.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    // 1. cria sessão
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: '',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const tokens = await this.generateTokens(user, session.id);

    const hashedRt = await argon2.hash(tokens.refreshToken);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: hashedRt },
    });

    return tokens;
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const sessions = await this.prisma.session.findMany({
        where: { userId: payload.sub, revoked: false },
      });

      for (const session of sessions) {
        const valid = await argon2.verify(session.refreshToken, refreshToken);

        if (valid) {
          const user = await this.users.findByEmail(payload.email);
          if (!user) throw new UnauthorizedException();

          await this.prisma.session.update({
            where: { id: session.id },
            data: { revoked: true },
          });

          const newSession = await this.prisma.session.create({
            data: {
              userId: user.id,
              refreshToken: '',
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          const tokens = await this.generateTokens(user, newSession.id);

          const hashedRt = await argon2.hash(tokens.refreshToken);

          await this.prisma.session.update({
            where: { id: newSession.id },
            data: { refreshToken: hashedRt },
          });

          return tokens;
        }
      }

      throw new UnauthorizedException('Sessão inválida');
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async logout(sessionId: string) {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revoked: true },
    });

    return { message: 'Logout realizado com sucesso' };
  }

  async logoutAll(userId: number) {
    await this.prisma.session.updateMany({
      where: { 
        userId: String(userId), 
        revoked: false },
      data: { revoked: true },
    });

    return { message: 'Logout de todos os dispositivos realizado' };
  }

  private async generateTokens(user: any, sessionId: string | null) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      sessionId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m' }),
      this.jwt.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}

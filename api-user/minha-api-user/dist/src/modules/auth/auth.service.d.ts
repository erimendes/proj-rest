import { UserService } from '../user/user.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private users;
    private prisma;
    private jwt;
    constructor(users: UserService, prisma: PrismaService, jwt: JwtService);
    register(email: string, pass: string, name?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(data: any, meta: {
        ip?: string;
        userAgent?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(sessionId: number): Promise<{
        message: string;
    }>;
    logoutAll(userId: number): Promise<{
        message: string;
    }>;
    private generateTokens;
}

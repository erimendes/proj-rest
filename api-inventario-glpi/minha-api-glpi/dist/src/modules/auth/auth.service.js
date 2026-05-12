"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../../database/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const argon2 = __importStar(require("argon2"));
let AuthService = class AuthService {
    users;
    prisma;
    jwt;
    constructor(users, prisma, jwt) {
        this.users = users;
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(email, pass, name) {
        const existing = await this.users.findByEmail(email);
        if (existing)
            throw new common_1.ConflictException('E-mail já cadastrado');
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
    async login(data, meta) {
        const user = await this.users.findByEmail(data.email);
        if (!user)
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        const valid = await argon2.verify(user.password, data.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Credenciais inválidas');
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
    async refresh(refreshToken) {
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
                    if (!user)
                        throw new common_1.UnauthorizedException();
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
            throw new common_1.UnauthorizedException('Sessão inválida');
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido ou expirado');
        }
    }
    async logout(sessionId) {
        await this.prisma.session.update({
            where: { id: sessionId },
            data: { revoked: true },
        });
        return { message: 'Logout realizado com sucesso' };
    }
    async logoutAll(userId) {
        await this.prisma.session.updateMany({
            where: {
                userId: String(userId),
                revoked: false
            },
            data: { revoked: true },
        });
        return { message: 'Logout de todos os dispositivos realizado' };
    }
    async generateTokens(user, sessionId) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
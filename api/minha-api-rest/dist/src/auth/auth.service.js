var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(data) {
        const exists = await this.userService.findByEmail(data.email);
        if (exists)
            throw new BadRequestException('User already exists');
        const hash = await argon2.hash(data.password);
        const user = await this.userService.create({
            ...data,
            password: hash,
        });
        return this.generateToken(user);
    }
    async login(data) {
        const user = await this.userService.findByEmail(data.email);
        if (!user)
            throw new UnauthorizedException('Invalid credentials');
        const valid = await argon2.verify(user.password, data.password);
        if (!valid)
            throw new UnauthorizedException('Invalid credentials');
        return this.generateToken(user);
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
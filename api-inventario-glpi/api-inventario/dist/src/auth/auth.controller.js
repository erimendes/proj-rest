var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const openapi = __require("@nestjs/swagger");
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
};
__decorate([
    Post('register'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Realizar cadastro de novo usuário' }),
    ApiResponse({
        status: 201,
        description: 'Usuário criado com sucesso.'
    }),
    ApiResponse({
        status: 400,
        description: 'Dados inválidos ou e-mail já em uso.'
    }),
    openapi.ApiResponse({ status: HttpStatus.CREATED }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Autenticar usuário e retornar Token JWT' }),
    ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso.'
    }),
    ApiResponse({
        status: 401,
        description: 'Credenciais inválidas.'
    }),
    openapi.ApiResponse({ status: HttpStatus.OK }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    ApiTags('auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map
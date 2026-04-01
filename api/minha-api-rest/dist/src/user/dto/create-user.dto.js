var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const openapi = __require("@nestjs/swagger");
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Role } from '../../generated/prisma/client.js';
export class CreateUserDto {
    username;
    fullName;
    email;
    password;
    departmentId;
    name;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String }, departmentId: { required: true, type: () => Number }, name: { required: false, type: () => String }, role: { required: false, type: () => Object } };
    }
}
__decorate([
    ApiProperty({ example: 'joao.silva' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ example: 'João Silva' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ example: 'user@example.com' }),
    IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Senha@123' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    IsNumber(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "departmentId", void 0);
__decorate([
    ApiProperty({ example: 'João' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({
        enum: Role,
        example: Role.USER,
        description: 'Nível de permissão do usuário'
    }),
    IsEnum(Role),
    IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map
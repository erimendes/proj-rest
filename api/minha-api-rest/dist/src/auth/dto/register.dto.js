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
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
export class RegisterDto {
    username;
    fullName;
    email;
    password;
    departmentId;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, maxLength: 20 }, departmentId: { required: true, type: () => Number }, name: { required: false, type: () => String, nullable: true } };
    }
}
__decorate([
    ApiProperty({ example: 'joao.silva', description: 'Nome de usuário único' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ example: 'João Silva' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ example: 'user@example.com' }),
    IsEmail({}, { message: 'Informe um e-mail válido' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Senha@123', minLength: 8 }),
    IsString(),
    MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    MaxLength(20),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ example: 1, description: 'ID do departamento' }),
    IsNotEmpty(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "departmentId", void 0);
__decorate([
    ApiProperty({ example: 'João', required: false, nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], RegisterDto.prototype, "name", void 0);
//# sourceMappingURL=register.dto.js.map
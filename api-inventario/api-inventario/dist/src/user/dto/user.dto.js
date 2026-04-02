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
import { Role } from '../../generated/prisma/browser.js';
export class UserDto {
    id;
    username;
    fullName;
    email;
    name;
    departmentId;
    createdAt;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, fullName: { required: true, type: () => String }, email: { required: true, type: () => String }, name: { required: true, type: () => String, nullable: true }, departmentId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, role: { required: true, type: () => Object } };
    }
}
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    ApiProperty({ example: 'joao.silva' }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ example: 'João Silva' }),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ example: 'user@email.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'João', required: false, nullable: true }),
    __metadata("design:type", Object)
], UserDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], UserDto.prototype, "departmentId", void 0);
__decorate([
    ApiProperty({ example: '2026-03-31T22:00:00.000Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    ApiProperty({ enum: Role, example: Role.USER }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
//# sourceMappingURL=user.dto.js.map
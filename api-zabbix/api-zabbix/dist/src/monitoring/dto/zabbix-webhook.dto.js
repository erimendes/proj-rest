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
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationPriority } from '../../generated/prisma/client.js';
export class ZabbixWebhookDto {
    eventid;
    host;
    ipAddress;
    triggerName;
    priority;
    status;
    message;
    static _OPENAPI_METADATA_FACTORY() {
        return { eventid: { required: true, type: () => String }, host: { required: true, type: () => String }, ipAddress: { required: false, type: () => String }, triggerName: { required: true, type: () => String }, priority: { required: true, type: () => Object }, status: { required: true, type: () => String }, message: { required: false, type: () => String } };
    }
}
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "eventid", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "host", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "ipAddress", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "triggerName", void 0);
__decorate([
    ApiProperty({ enum: NotificationPriority }),
    IsEnum(NotificationPriority),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "priority", void 0);
__decorate([
    ApiProperty({ example: 'PROBLEM' }),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ZabbixWebhookDto.prototype, "message", void 0);
//# sourceMappingURL=zabbix-webhook.dto.js.map
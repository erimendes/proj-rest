// src/monitoring/dto/zabbix-webhook.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationPriority } from '../../generated/prisma/client.js';

export class ZabbixWebhookDto {
  @ApiProperty()
  @IsString()
  eventid: string;

  @ApiProperty()
  @IsString()
  host: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty()
  @IsString()
  triggerName: string;

  @ApiProperty({ enum: NotificationPriority })
  @IsEnum(NotificationPriority)
  priority: NotificationPriority;

  @ApiProperty({ example: 'PROBLEM' })
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
// src/monitoring/monitoring.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MonitoringService } from './monitoring.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Post('zabbix')
  @ApiOperation({ summary: 'Receber alerta do Zabbix' })
  @ApiResponse({ status: 201, description: 'Alerta processado com sucesso' })
  async receiveZabbixAlert(@Body() data: ZabbixWebhookDto) {
    return this.monitoringService.handleWebhook(data);
  }
}
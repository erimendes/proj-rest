// src/monitoring/monitoring.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';

@Injectable()
export class MonitoringService {
  constructor(private prisma: PrismaService) {}

  async handleWebhook(data: ZabbixWebhookDto) {
    try {
      return await this.prisma.notification.upsert({
        where: { eventid: data.eventid },
        update: {
          status: data.status,
          resolvedAt: data.status === 'RESOLVED' ? new Date() : null,
        },
        create: {
          eventid: data.eventid,
          host: data.host,
          ipAddress: data.ipAddress,
          triggerName: data.triggerName,
          priority: data.priority,
          status: data.status,
          message: data.message,
          // assetHostname: data.host, ← se estiver dando erro, comenta isso
        },
      });
    } catch (error) {
      console.error('🔥 ERRO COMPLETO:', error);
      console.error('🔥 CODE:', error.code);
      console.error('🔥 META:', error.meta);
      throw error;
    }
  }
}
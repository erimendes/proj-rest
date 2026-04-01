// src/monitoring/monitoring.module.ts
import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service.js';
import { MonitoringController } from './monitoring.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [MonitoringService],
  controllers: [MonitoringController],
})
export class MonitoringModule {}

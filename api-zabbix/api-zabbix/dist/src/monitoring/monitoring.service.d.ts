import { PrismaService } from '../prisma/prisma.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
export declare class MonitoringService {
    private prisma;
    constructor(prisma: PrismaService);
    handleWebhook(data: ZabbixWebhookDto): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        message: string | null;
        eventid: string | null;
        host: string;
        ipAddress: string | null;
        triggerName: string;
        priority: import("../generated/prisma/enums.js").NotificationPriority;
        acknowledged: boolean;
        assetHostname: string | null;
        resolvedAt: Date | null;
    }>;
}

import { PrismaService } from '../prisma/prisma.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
export declare class MonitoringService {
    private prisma;
    constructor(prisma: PrismaService);
    handleWebhook(data: ZabbixWebhookDto): Promise<{
        id: number;
        eventid: string | null;
        host: string;
        ipAddress: string | null;
        triggerName: string;
        priority: import("../generated/prisma/enums.js").NotificationPriority;
        status: string;
        message: string | null;
        acknowledged: boolean;
        assetHostname: string | null;
        createdAt: Date;
        resolvedAt: Date | null;
    }>;
}

import { MonitoringService } from './monitoring.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    receiveZabbixAlert(data: ZabbixWebhookDto): Promise<{
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

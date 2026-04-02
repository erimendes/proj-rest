import { MonitoringService } from './monitoring.service.js';
import { ZabbixWebhookDto } from './dto/zabbix-webhook.dto.js';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    receiveZabbixAlert(data: ZabbixWebhookDto): Promise<{
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

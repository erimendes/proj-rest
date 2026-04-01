import { NotificationPriority } from '../../generated/prisma/client.js';
export declare class ZabbixWebhookDto {
    eventid: string;
    host: string;
    ipAddress?: string;
    triggerName: string;
    priority: NotificationPriority;
    status: string;
    message?: string;
}

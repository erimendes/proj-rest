import { PrismaService } from '../../database/prisma.service';
import { TableStatus } from '../../generated/prisma/client';
export declare class TableService {
    private prisma;
    constructor(prisma: PrismaService);
    create(number: number): Promise<{
        number: number;
        id: string;
        status: TableStatus;
    }>;
    findAll(): Promise<{
        number: number;
        id: string;
        status: TableStatus;
    }[]>;
    findFree(): Promise<{
        number: number;
        id: string;
        status: TableStatus;
    }[]>;
    updateStatus(id: string, status: TableStatus): Promise<{
        number: number;
        id: string;
        status: TableStatus;
    }>;
    remove(id: string): Promise<{
        number: number;
        id: string;
        status: TableStatus;
    }>;
}

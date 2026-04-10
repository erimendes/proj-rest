import { TableService } from './table.service';
import { TableStatus } from '../../generated/prisma/client';
export declare class TableController {
    private readonly tableService;
    constructor(tableService: TableService);
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

import { PrismaService } from '../../database/prisma.service';
import { OrderStatus, TableStatus } from '../../generated/prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, tableId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    addItem(orderId: string, productId: string, quantity: number, observation?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    listPending(): Promise<({
        table: {
            number: number;
            id: string;
            status: TableStatus;
        };
        items: ({
            product: {
                description: string | null;
                name: string;
                id: string;
                createdAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findOne(id: string): Promise<({
        user: {
            name: string | null;
        };
        table: {
            number: number;
            id: string;
            status: TableStatus;
        };
        items: ({
            product: {
                description: string | null;
                name: string;
                id: string;
                createdAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }) | null>;
}

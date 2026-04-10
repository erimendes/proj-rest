import { OrderService } from './order.service';
import { OrderStatus } from '../../generated/prisma/client';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(req: any, tableId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    addItem(id: string, data: {
        productId: string;
        quantity: number;
        observation?: string;
    }): Promise<{
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
            status: import("../../generated/prisma/enums").TableStatus;
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
    updateStatus(id: string, status: OrderStatus): Promise<{
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
            status: import("../../generated/prisma/enums").TableStatus;
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

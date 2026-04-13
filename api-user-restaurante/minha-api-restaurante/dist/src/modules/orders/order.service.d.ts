import { PrismaService } from '../../database/prisma.service';
import { OrderStatus, TableStatus } from '../../generated/prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateOrderDto): Promise<{
        tableId: string;
        id: string;
        status: OrderStatus;
        userId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listPending(): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            productId: string;
            quantity: number;
            id: string;
            status: string;
            createdAt: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
            orderId: string;
        })[];
        table: {
            number: number;
            id: string;
            status: TableStatus;
        };
    } & {
        tableId: string;
        id: string;
        status: OrderStatus;
        userId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        tableId: string;
        id: string;
        status: OrderStatus;
        userId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            productId: string;
            quantity: number;
            id: string;
            status: string;
            createdAt: Date;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
            orderId: string;
        })[];
        table: {
            number: number;
            id: string;
            status: TableStatus;
        };
        user: {
            name: string | null;
        };
    } & {
        tableId: string;
        id: string;
        status: OrderStatus;
        userId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}

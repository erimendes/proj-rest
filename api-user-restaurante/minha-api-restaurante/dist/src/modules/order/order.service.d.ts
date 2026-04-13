import { PrismaService } from '../../database/prisma.service';
import { OrderStatus } from '../../generated/prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrderDto): Promise<{
        id: string;
        tableId: string;
        userId: string;
        status: OrderStatus;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addItem(dto: AddItemDto): Promise<{
        message: string;
        item: {
            id: string;
            status: string;
            createdAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
        };
        currentTotal: number;
    }>;
    findAll(): Promise<({
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
                name: string;
                id: string;
                createdAt: Date;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
        })[];
    } & {
        id: string;
        tableId: string;
        userId: string;
        status: OrderStatus;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
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
                name: string;
                id: string;
                createdAt: Date;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                imageUrl: string | null;
                categoryId: string;
            };
        } & {
            id: string;
            status: string;
            createdAt: Date;
            orderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            observation: string | null;
        })[];
    } & {
        id: string;
        tableId: string;
        userId: string;
        status: OrderStatus;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        tableId: string;
        userId: string;
        status: OrderStatus;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

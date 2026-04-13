import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../generated/prisma/client';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<{
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
            status: import("../../generated/prisma/enums").TableStatus;
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
            status: import("../../generated/prisma/enums").TableStatus;
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
    updateStatus(id: string, status: OrderStatus): Promise<{
        tableId: string;
        id: string;
        status: OrderStatus;
        userId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

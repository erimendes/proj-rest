import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { OrderStatus } from '../../generated/prisma/client';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    addItem(addItemDto: AddItemDto): Promise<{
        message: string;
        item: {
            id: string;
            createdAt: Date;
            status: string;
            productId: string;
            quantity: number;
            orderId: string;
            observation: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
        };
        currentTotal: number;
    }>;
    listPending(): Promise<({
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
                categoryId: string;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            productId: string;
            quantity: number;
            orderId: string;
            observation: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
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
                description: string | null;
                name: string;
                id: string;
                createdAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                categoryId: string;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            productId: string;
            quantity: number;
            orderId: string;
            observation: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
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
                description: string | null;
                name: string;
                id: string;
                createdAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                categoryId: string;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            productId: string;
            quantity: number;
            orderId: string;
            observation: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updateStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        tableId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
}

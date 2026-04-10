import { PrismaService } from '../../database/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: string;
        };
    } & {
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    })[]>;
    findByCategory(categoryId: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }[]>;
    update(id: string, data: any): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
}

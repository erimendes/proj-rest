import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    })[]>;
    findByCategory(categoryId: string): Promise<({
        category: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    })[]>;
    update(id: string, data: Partial<CreateProductDto>): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
}

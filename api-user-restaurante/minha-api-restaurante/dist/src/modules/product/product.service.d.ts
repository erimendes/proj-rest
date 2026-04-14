import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
        imageUrl: string | null;
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
        categoryId: string;
        imageUrl: string | null;
    })[]>;
    findByCategory(categoryId: string): Promise<({
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
        categoryId: string;
        imageUrl: string | null;
    })[]>;
    update(id: string, data: Partial<CreateProductDto>): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
        imageUrl: string | null;
    }>;
}

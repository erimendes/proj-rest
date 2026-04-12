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
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: string;
            imageUrl: string | null;
        };
    } & {
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    })[]>;
    findByCategory(categoryId: string): Promise<({
        category: {
            name: string;
            id: string;
            imageUrl: string | null;
        };
    } & {
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    })[]>;
    update(id: string, data: Partial<CreateProductDto>): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    }>;
}

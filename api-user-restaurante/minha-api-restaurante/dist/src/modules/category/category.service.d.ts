import { PrismaService } from '../../database/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string): Promise<{
        name: string;
        id: string;
        imageUrl: string | null;
    }>;
    findAll(): Promise<({
        products: {
            description: string | null;
            name: string;
            id: string;
            createdAt: Date;
            imageUrl: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            categoryId: string;
        }[];
    } & {
        name: string;
        id: string;
        imageUrl: string | null;
    })[]>;
    update(id: string, name: string): Promise<{
        name: string;
        id: string;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        imageUrl: string | null;
    }>;
}

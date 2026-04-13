import { PrismaService } from '../../database/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string): Promise<{
        id: string;
        name: string;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            name: string;
            createdAt: Date;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            imageUrl: string | null;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
    })[]>;
    update(id: string, name: string): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
    }>;
}

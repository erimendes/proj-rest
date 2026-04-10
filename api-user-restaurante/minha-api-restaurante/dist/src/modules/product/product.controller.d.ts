import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(data: {
        name: string;
        price: number;
        categoryId: string;
        description?: string;
    }): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    findAll(categoryId?: string): Promise<{
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

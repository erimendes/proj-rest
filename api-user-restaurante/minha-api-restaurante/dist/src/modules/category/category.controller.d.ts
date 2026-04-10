import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(name: string): Promise<{
        name: string;
        id: string;
    }>;
    findAll(): Promise<({
        products: {
            description: string | null;
            name: string;
            id: string;
            createdAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            imageUrl: string | null;
            categoryId: string;
        }[];
    } & {
        name: string;
        id: string;
    })[]>;
    update(id: string, name: string): Promise<{
        name: string;
        id: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
    }>;
}

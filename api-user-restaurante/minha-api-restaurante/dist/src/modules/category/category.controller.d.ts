import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
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
    update(id: string, updateData: CreateCategoryDto): Promise<{
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

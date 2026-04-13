import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
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
    update(id: string, updateData: CreateCategoryDto): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
    }>;
}

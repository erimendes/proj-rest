import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
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
            categoryId: string;
            imageUrl: string | null;
        }[];
    } & {
        name: string;
        id: string;
    })[]>;
    update(id: string, updateData: CreateCategoryDto): Promise<{
        name: string;
        id: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
    }>;
}

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        imageUrl: string | null;
        categoryId: string;
    }>;
    findAll(categoryId?: string): Promise<({
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
    update(id: string, updateData: Partial<CreateProductDto>): Promise<{
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

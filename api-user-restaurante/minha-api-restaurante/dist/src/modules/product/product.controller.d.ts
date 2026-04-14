import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
        imageUrl: string | null;
    }>;
    findAll(categoryId?: string): Promise<({
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
    update(id: string, updateData: Partial<CreateProductDto>): Promise<{
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

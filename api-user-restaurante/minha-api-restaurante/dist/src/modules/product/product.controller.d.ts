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
        imageUrl: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        categoryId: string;
    }>;
    findAll(categoryId?: string): Promise<({
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
    update(id: string, updateData: Partial<CreateProductDto>): Promise<{
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

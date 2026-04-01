import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
export declare class UserService {
    private readonly prisma;
    private readonly userSelect;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string | null;
        username: string;
        fullName: string;
        email: string;
        departmentId: number;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
    }[]>;
    findByEmail(email: string): Promise<{
        id: number;
        name: string | null;
        username: string;
        fullName: string;
        email: string;
        password: string;
        departmentId: number;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: CreateUserDto): Promise<{
        id: number;
        name: string | null;
        username: string;
        fullName: string;
        email: string;
        departmentId: number;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
    }>;
}

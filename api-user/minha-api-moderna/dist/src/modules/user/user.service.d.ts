import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        id: number;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        id: number;
    } | null>;
    findAll(): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: number;
    }[]>;
}

import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    update(id: string, data: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAll(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
    }[]>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: string;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

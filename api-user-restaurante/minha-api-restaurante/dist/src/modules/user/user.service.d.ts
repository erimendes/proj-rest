import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
    }>;
    update(id: string, data: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

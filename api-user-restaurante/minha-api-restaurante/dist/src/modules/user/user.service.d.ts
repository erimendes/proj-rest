import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, data: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
    }>;
    findAll(): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
    }[]>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

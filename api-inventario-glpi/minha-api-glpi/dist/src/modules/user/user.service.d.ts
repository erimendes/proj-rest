import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    update(id: string, data: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        departamento: string | null;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("../../generated/prisma/enums").Role;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        role: import("../../generated/prisma/enums").Role;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: import("../../generated/prisma/enums").Role;
        departamento: string | null;
    }>;
}

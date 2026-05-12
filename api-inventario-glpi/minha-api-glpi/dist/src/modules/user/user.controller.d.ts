import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../generated/prisma/client';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    create(body: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        role: Role;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        name: string | null;
        email: string;
        role: Role;
    }[]>;
    updateMe(req: any, body: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: Role;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string;
        password: string;
        role: Role;
        departamento: string | null;
    }>;
}

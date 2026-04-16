import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../generated/prisma/client';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    create(body: CreateUserDto): Promise<{
        email: string;
        name: string | null;
        role: Role;
        id: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        name: string | null;
        role: Role;
        id: string;
        createdAt: Date;
    }[]>;
    updateMe(req: any, body: UpdateUserDto): Promise<{
        email: string;
        name: string | null;
        role: Role;
        id: string;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

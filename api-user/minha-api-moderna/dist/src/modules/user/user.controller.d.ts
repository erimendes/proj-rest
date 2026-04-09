import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: number;
    }[]>;
}

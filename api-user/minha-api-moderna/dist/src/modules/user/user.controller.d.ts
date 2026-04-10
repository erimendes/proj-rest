import { UserService } from './user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    findAll(): Promise<{
        email: string;
        name: string | null;
        role: import("../../generated/prisma/enums").Role;
        id: number;
    }[]>;
}

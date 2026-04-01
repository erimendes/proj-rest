import { UserService } from './user.service.js';
export declare class UserController {
    private service;
    constructor(service: UserService);
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
}

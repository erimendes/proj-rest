import { UserService } from './user.service.js';
export declare class UserController {
    private service;
    constructor(service: UserService);
    findAll(): Promise<{
        id: number;
        name: never;
        username: string;
        fullName: string;
        email: string;
        departmentId: number | null;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
    }[]>;
}

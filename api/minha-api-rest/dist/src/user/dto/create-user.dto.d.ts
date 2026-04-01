import { Role } from '../../generated/prisma/client.js';
export declare class CreateUserDto {
    username: string;
    fullName: string;
    email: string;
    password: string;
    departmentId: number;
    name?: string | null;
    role?: Role;
}

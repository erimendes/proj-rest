import { Role } from '../../generated/prisma/browser.js';
export declare class UserDto {
    id: number;
    username: string;
    fullName: string;
    email: string;
    name: string | null;
    departmentId: number;
    createdAt: Date;
    role: Role;
}

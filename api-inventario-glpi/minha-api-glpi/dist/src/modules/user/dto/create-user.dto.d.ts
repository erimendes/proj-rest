import { Role } from '../../../generated/prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: Role;
}

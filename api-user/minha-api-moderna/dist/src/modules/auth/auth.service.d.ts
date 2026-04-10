import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        access_token: string;
    }>;
    register(email: string, pass: string, name?: string): Promise<{
        access_token: string;
    }>;
}

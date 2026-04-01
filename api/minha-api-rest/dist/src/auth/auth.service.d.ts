import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(data: any): Promise<{
        access_token: string;
    }>;
    login(data: any): Promise<{
        access_token: string;
    }>;
    private generateToken;
}

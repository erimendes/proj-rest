import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        access_token: string;
    }>;
    login(data: any): Promise<{
        access_token: string;
    }>;
    private generateToken;
}

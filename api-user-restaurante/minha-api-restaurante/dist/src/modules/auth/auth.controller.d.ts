import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(body: CreateUserDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(body: LoginDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(body: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

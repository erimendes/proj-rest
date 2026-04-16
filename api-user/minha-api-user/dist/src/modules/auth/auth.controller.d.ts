import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(body: RegisterDto): Promise<{
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

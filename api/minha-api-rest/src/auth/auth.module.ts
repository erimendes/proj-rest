import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    forwardRef(() => UserModule), // ✅ Mantenha apenas este
    // UserModule, <--- ❌ REMOVA ESTA LINHA, ela está anulando o forwardRef
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService] // Dica: Exportar se o UserModule precisar do AuthService
})
export class AuthModule {}
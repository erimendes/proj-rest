import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    // Use forwardRef para evitar dependência circular com UserModule
    forwardRef(() => UserModule),
    
    // Configuração assíncrona para GARANTIR que o JWT_SECRET seja lido
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController], // Essencial para as rotas funcionarem
  providers: [AuthService, JwtStrategy], // Essencial para a lógica e segurança
  exports: [AuthService], // Exportar se outros módulos precisarem
})
export class AuthModule {}
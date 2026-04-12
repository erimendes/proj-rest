import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    forwardRef(() => AuthModule), // ✅ Correto
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}

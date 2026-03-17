import { Module } from '@nestjs/common';
// import { AuthController } from './presentation/http/auth.controller';
import { AuthController } from './presentation/http/auth.controller.js';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case.js';
import { PrismaService } from './infrastructure/database/prisma.service.js';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository.js';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    RegisterUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
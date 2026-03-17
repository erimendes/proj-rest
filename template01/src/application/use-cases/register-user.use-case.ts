// services/identity-service/src/application/use-cases/register-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity.js'; // Importando a entidade User do domínio
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository.js'; // Importando o repositório PrismaUserRepository

@Injectable()
export class RegisterUserUseCase {
  constructor(
    // Usamos o @Inject para manter o desacoplamento do DDD
    @Inject('IUserRepository')
    private readonly userRepository: PrismaUserRepository,
  ) {}

  async execute(email: string, pass: string, role: string) {
    const user = User.create(email, pass, role);
    
    // Agora o dado será persistido no Postgres!
    await this.userRepository.save(user);
    
    return user;
  }
}
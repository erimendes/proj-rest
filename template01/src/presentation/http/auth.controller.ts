import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case.js'; // Importando o use case de registro de usuário

@Controller('auth')
// Certifique-se de que o "export" está aqui embaixo!
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.registerUseCase.execute(body.email, body.password, body.role);
  }
}
Para criar um CRUD completo no NestJS, o melhor caminho é utilizar os **Decoradores HTTP** (`@Get`, `@Post`, `@Patch`, `@Delete`) dentro do Controller.

Como já criamos o `UserModule`, vamos estruturar o `UserController` para gerenciar os dados do usuário.

---

### 1. Definindo o DTO (Data Transfer Object)

Antes das rotas, precisamos definir como os dados devem chegar. Crie o arquivo `src/user/dto/create-user.dto.ts`:

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}

```

---

### 2. Implementando o Controller

O Controller recebe as requisições e delega a lógica para o Service.

```typescript
// src/user/user.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Prefixo da rota: localhost:3000/users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}

```

---

### 3. Implementando a Lógica no Service

Agora, o `UserService` precisa ter essas funções. Se você já configurou o Prisma, seria assim:

```typescript
// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = []; // Simulando um banco de dados temporário

  create(dto: any) {
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, dto: any) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundException('Usuário não encontrado');
    this.users[userIndex] = { ...this.users[userIndex], ...dto };
    return this.users[userIndex];
  }

  remove(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    return { message: 'Removido com sucesso' };
  }
}

```

### Resumo das Rotas Criadas:

| Método | Rota | Descrição |
| --- | --- | --- |
| **POST** | `/users` | Cria um novo usuário (Valida com DTO) |
| **GET** | `/users` | Lista todos os usuários |
| **GET** | `/users/:id` | Busca um usuário específico por ID |
| **PATCH** | `/users/:id` | Atualiza dados parciais de um usuário |
| **DELETE** | `/users/:id` | Remove um usuário |

---

### O toque de mestre

Como você instalou o **Prisma**, o próximo passo é substituir esse array `private users = []` pelas chamadas reais do banco, como `this.prisma.user.create()`.

**Quer que eu te mostre como criar o `PrismaService` e injetá-lo no `UserService` para salvar esses dados de verdade?**
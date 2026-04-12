Perfeito — agora vamos montar uma estrutura **nível profissional mesmo**, pensando em crescimento, manutenção e segurança no NestJS.

Vou expandir sua base e te explicar o *porquê* de cada parte 👇

---

# 🏗️ Estrutura completa recomendada

```txt
src/
├── app.module.ts
├── main.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
│
├── user/
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common/
│   ├── crypto/
│   │   ├── crypto.module.ts
│   │   └── password.service.ts
│   │
│   ├── guards/
│   │   ├── roles.guard.ts
│   │   └── optional-auth.guard.ts
│   │
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   ├── public.decorator.ts
│   │   └── user.decorator.ts
│   │
│   ├── interceptors/
│   │   └── transform.interceptor.ts
│   │
│   ├── filters/
│   │   └── http-exception.filter.ts
│   │
│   ├── pipes/
│   │   └── validation.pipe.ts
│   │
│   ├── utils/
│   │   ├── date.util.ts
│   │   └── string.util.ts
│   │
│   ├── constants/
│   │   └── roles.constant.ts
│   │
│   └── types/
│       └── user-request.type.ts
│
└── config/
    ├── env.config.ts
    └── jwt.config.ts
```

---

# 🧠 Filosofia dessa estrutura

👉 Separação por responsabilidade:

* `auth/` → autenticação
* `user/` → domínio do usuário
* `common/` → coisas reutilizáveis
* `prisma/` → acesso ao banco
* `config/` → configurações

---

# 🔐 `common/crypto/`

Centraliza segurança:

```ts
password.service.ts
```

* hash
* compare
* pode trocar algoritmo sem afetar o resto

---

# 🛡️ `common/guards/`

Guards globais reutilizáveis:

### `roles.guard.ts`

```ts
// verifica roles
```

### `optional-auth.guard.ts`

👉 permite rota com ou sem login

---

# 🧩 `common/decorators/`

Facilitam uso nos controllers:

### `roles.decorator.ts`

```ts
@Roles('admin')
```

---

### `public.decorator.ts`

```ts
@Public()
```

👉 ignora autenticação

---

### `user.decorator.ts`

```ts
@Get()
getProfile(@User() user) {}
```

---

# 🔄 `common/interceptors/`

Transformação de resposta:

### `transform.interceptor.ts`

👉 padroniza API:

```json
{
  "data": {},
  "message": "success"
}
```

---

# 🚨 `common/filters/`

Tratamento global de erro:

### `http-exception.filter.ts`

👉 evita:

```json
Internal server error
```

👉 e retorna algo útil:

```json
{
  "statusCode": 400,
  "message": "Email already exists"
}
```

---

# 🧪 `common/pipes/`

Validação:

### `validation.pipe.ts`

Usa class-validator:

```ts
app.useGlobalPipes(new ValidationPipe());
```

---

# 🧰 `common/utils/`

Funções puras:

```ts
formatDate()
slugify()
```

👉 sem dependência de Nest

---

# 📦 `common/constants/`

Evita string solta:

```ts
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
```

---

# 🧾 `common/types/`

Tipos globais:

```ts
export type RequestUser = {
  id: number;
  email: string;
};
```

---

# ⚙️ `config/`

Centraliza configs:

### `jwt.config.ts`

```ts
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
```

---

# 🔥 Boas práticas importantes

## ✅ 1. Nunca misture responsabilidades

Errado:

```ts
user.service.ts → hash senha
```

Certo:

```ts
password.service.ts → hash
user.service.ts → usa
```

---

## ✅ 2. Tudo reutilizável vai para `common/`

Se você copiar código → está no lugar errado.

---

## ✅ 3. Auth não depende de User diretamente

👉 use service, não acoplamento direto

---

# 🚀 Estrutura mental (regra de ouro)

```txt
feature → auth, user
infra → prisma
shared → common
config → config
```

---

# ⚡ Resumo

👉 Essa estrutura te dá:

* escalabilidade
* código limpo
* segurança centralizada
* fácil manutenção

---

Se quiser, posso te montar um **Auth completo (JWT + login + register + guard + roles)** já plugado exatamente nessa estrutura 👀



Boa — aqui é onde muita gente se perde: **essa estrutura é completa, mas você NÃO precisa implementar tudo de uma vez**.

Vou te mostrar o **mínimo necessário pra funcionar (login + JWT + proteção de rota)** 👇

---

# ✅ 🔥 MVP (o que você REALMENTE precisa implementar primeiro)

Se seu objetivo é:

👉 **register + login + rota protegida**

Você precisa só disso:

---

## 📁 ESSENCIAIS

```txt
auth/
├── auth.module.ts        ✅ obrigatório
├── auth.controller.ts    ✅ obrigatório
├── auth.service.ts       ✅ obrigatório
├── strategies/
│   └── jwt.strategy.ts   ✅ obrigatório
├── guards/
│   └── jwt-auth.guard.ts ✅ obrigatório
└── dto/
    ├── login.dto.ts      ✅ obrigatório
    └── register.dto.ts   ✅ obrigatório
```

```txt
user/
├── user.service.ts       ✅ obrigatório
```

```txt
common/
├── crypto/
│   └── password.service.ts ✅ obrigatório
```

```txt
config/
└── jwt.config.ts         ✅ recomendado
```

---

# 🧠 Ordem de implementação (PASSO A PASSO)

## 🥇 1. PasswordService

👉 base de tudo

```ts
hash()
compare()
```

---

## 🥈 2. UserService

👉 já tem quase pronto

Só precisa:

```ts
createUser()
findByEmail()
```

---

## 🥉 3. AuthService

👉 coração do login

Responsável por:

* validar usuário
* comparar senha
* gerar JWT

---

## 🏅 4. JWT Strategy

👉 lê token e injeta usuário

```ts
validate(payload)
```

---

## 🏅 5. JWT Guard

👉 protege rotas

```ts
@UseGuards(JwtAuthGuard)
```

---

## 🏅 6. AuthController

👉 endpoints:

```txt
POST /auth/register
POST /auth/login
```

---

# 🚫 O que você NÃO precisa agora

Pode ignorar por enquanto:

```txt
❌ roles.guard.ts
❌ roles.decorator.ts
❌ interceptors/
❌ filters/
❌ utils/
❌ optional-auth.guard.ts
❌ constants/
❌ types/
```

👉 isso é **nível avançado / refino**

---

# 🧱 Estrutura mínima funcional

```txt
src/
├── auth/
├── user/
├── prisma/
├── common/crypto/
└── main.ts
```

---

# 🔥 Fluxo completo (como tudo se conecta)

```txt
POST /auth/register
  → AuthController
    → AuthService
      → UserService
        → PasswordService (hash)
        → Prisma

POST /auth/login
  → AuthController
    → AuthService
      → UserService
      → PasswordService (compare)
      → JWT (gera token)

GET /profile
  → JwtAuthGuard
    → JwtStrategy
      → injeta user
```

---

# ⚡ Regra de ouro

👉 Se não faz login funcionar, não adianta ter:

* roles
* decorators
* interceptors

---

# 🚀 Ordem ideal (bem prática)

1. `password.service.ts`
2. `user.service.ts`
3. `auth.service.ts`
4. `auth.controller.ts`
5. `jwt.strategy.ts`
6. `jwt-auth.guard.ts`

👉 só isso já te dá login completo

---

# 🧠 Resumo direto

👉 Comece com:

* Auth (service + controller)
* JWT (strategy + guard)
* PasswordService

👉 Ignore o resto por enquanto

---

Se quiser, posso te mandar um **AuthModule completo pronto (copiar e colar)** funcionando com Prisma + Argon2 + JWT 👀


Perfeito — aqui vai um **Auth completo, funcional e pronto pra colar** no seu projeto NestJS com **Prisma + Argon2 + JWT** 🚀

Vou te dar só o essencial, já organizado conforme sua estrutura.

---

# 📦 1. `common/crypto/password.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
    });
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
```

---

# 📦 2. `auth/dto/register.dto.ts`

```ts
export class RegisterDto {
  email: string;
  password: string;
  name?: string;
}
```

---

# 📦 3. `auth/dto/login.dto.ts`

```ts
export class LoginDto {
  email: string;
  password: string;
}
```

---

# 📦 4. `auth/auth.service.ts`

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from '../common/crypto/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashedPassword = await this.passwordService.hash(data.password);

    const user = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });

    return { id: user.id, email: user.email };
  }

  async login(data: any) {
    const user = await this.userService.user({
      email: data.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.passwordService.compare(
      data.password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

---

# 📦 5. `auth/auth.controller.ts`

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }
}
```

---

# 📦 6. `auth/strategies/jwt.strategy.ts`

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret', // 🔥 depois coloca no .env
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
```

---

# 📦 7. `auth/guards/jwt-auth.guard.ts`

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

---

# 📦 8. `auth/auth.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../common/crypto/password.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    PasswordService,
    JwtStrategy,
  ],
})
export class AuthModule {}
```

---

# 📦 9. Proteger rota (exemplo)

```ts
import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile() {
  return { message: 'rota protegida' };
}
```

---

# 🧪 TESTE COMPLETO

## 🔹 Registrar

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

---

## 🔹 Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

👉 retorna:

```json
{
  "access_token": "..."
}
```

---

## 🔹 Rota protegida

```bash
curl http://localhost:3000/profile \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

# ⚠️ MELHORIAS IMPORTANTES (depois)

* mover `secret` pro `.env`
* usar DTO + validação (`class-validator`)
* adicionar `RolesGuard`
* refresh token

---

# 🚀 Resultado

Com isso você já tem:

✅ registro
✅ login
✅ hash seguro com argon2
✅ JWT
✅ rotas protegidas

---

Se quiser, próximo passo posso te ajudar a adicionar:

👉 **roles (admin/user)**
👉 **refresh token (login tipo produção)**
👉 **validação com DTO profissional**

Só falar 👍

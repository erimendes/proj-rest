Perfeito — agora vamos evoluir seu projeto para uma **arquitetura profissional NestJS** (modular, escalável e limpa). 🚀

A ideia é: **cada domínio tem seu próprio módulo**, e o `AppModule` só orquestra tudo.

---

# 🧱 Estrutura ideal

```bash
src/
├── app.module.ts
├── main.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   └── guards/
│
├── user/
│   ├── user.module.ts
│   ├── user.service.ts
│   ├── user.controller.ts
│
├── post/
│   ├── post.module.ts
│   ├── post.service.ts
│   ├── post.controller.ts
│
├── admin/
│   ├── admin.module.ts
│   └── admin.controller.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common/
│   ├── guards/
│   ├── decorators/
│   └── crypto/
```

---

# 🔥 1️⃣ PrismaModule (centralizado)

## 📁 `src/prisma/prisma.module.ts`

```ts id="8f7l9k"
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // 🔥 disponível em toda a aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

👉 Agora você NÃO precisa importar Prisma em todo lugar.

---

# 🔥 2️⃣ UserModule

## 📁 `src/user/user.module.ts`

```ts id="v3m8tp"
import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 🔥 usado no AuthModule
})
export class UserModule {}
```

---

# 🔥 3️⃣ AuthModule

## 📁 `src/auth/auth.module.ts`

```ts id="k2j9zm"
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from '../common/crypto/password.service.js';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey', // ⚠️ usar .env depois
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
```

---

# 🔥 4️⃣ PostModule

## 📁 `src/post/post.module.ts`

```ts id="pq9xw2"
import { Module } from '@nestjs/common';
import { PostService } from './post.service.js';
import { PostController } from './post.controller.js';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
```

---

# 🔥 5️⃣ AdminModule (separado)

## 📁 `src/admin/admin.module.ts`

```ts id="3u6k9y"
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller.js';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
```

---

# 🔥 6️⃣ AppModule (limpo)

Agora seu `AppModule` fica MUITO mais simples:

```ts id="1d6yqv"
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { PostModule } from './post/post.module.js';
import { AdminModule } from './admin/admin.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    AdminModule,
  ],
})
export class AppModule {}
```

---

# 🧠 O que mudou (importante)

Antes:

```ts
providers: [PrismaService, PostService]
controllers: [AdminController]
```

Agora:

* Cada módulo cuida do seu próprio service/controller
* `AppModule` só junta tudo
* Código mais organizado e escalável

---

# 💡 Benefícios reais

✅ Separação clara de responsabilidades
✅ Fácil manutenção
✅ Escalável (projeto cresce sem virar bagunça)
✅ Testes mais simples
✅ Reutilização de módulos

---

# ⚠️ Dica profissional

* Tudo que for **global/shared** → `common/`
* Tudo que for **feature** → módulo próprio
* Nunca deixar `AppModule` gigante

---

# 🚀 Próximo nível

Se quiser evoluir ainda mais, posso te mostrar:

* ✅ `.env` + JWT seguro
* ✅ Refresh token
* ✅ RBAC avançado (roles + permissions)
* ✅ Interceptors globais
* ✅ Logs e tratamento de erro profissional

Só me fala: **“quero nível produção”** 😄


---

# 🧱 1️⃣ Estrutura final (produção)

```bash
src/
├── app.module.ts
├── main.ts
│
├── config/
│   ├── env.config.ts
│   └── jwt.config.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   ├── guards/
│   └── dto/
│
├── user/
│   ├── user.module.ts
│   ├── user.service.ts
│   └── user.controller.ts
│
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   └── crypto/
```

---

# 🔐 2️⃣ Configuração segura (.env)

## 📁 `.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nestdb"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1h"
```

---

## 📁 `config/jwt.config.ts`

```ts
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
```

---

# ⚙️ 3️⃣ ConfigModule global

## 📁 `app.module.ts`

```ts
imports: [
  ConfigModule.forRoot({
    isGlobal: true, // 🔥 disponível em toda app
  }),
]
```

---

# 🔐 4️⃣ JWT profissional

## 📁 `auth.module.ts`

```ts
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get('JWT_SECRET'),
    signOptions: {
      expiresIn: config.get('JWT_EXPIRES_IN'),
    },
  }),
});
```

---

# 🔑 5️⃣ Refresh Token (ESSENCIAL)

## 💡 Por que usar?

* Access token expira rápido
* Refresh token renova sessão
* Mais seguro

---

## 📁 Prisma (User)

```prisma
refreshToken String?
```

---

## 📁 `auth.service.ts`

```ts
async login(data: LoginDto) {
  const user = await this.validateUser(data);

  const payload = { sub: user.id, role: user.role };

  const accessToken = this.jwtService.sign(payload);

  const refreshToken = this.jwtService.sign(payload, {
    expiresIn: '7d',
  });

  await this.userService.updateUser({
    where: { id: user.id },
    data: {
      refreshToken: await this.passwordService.hash(refreshToken),
    },
  });

  return { accessToken, refreshToken };
}
```

---

## 🔁 Refresh endpoint

```ts
@Post('refresh')
async refresh(@Body() body: { refreshToken: string }) {
  const payload = this.jwtService.verify(body.refreshToken);

  const user = await this.userService.user({ id: payload.sub });

  const isValid = await this.passwordService.compare(
    body.refreshToken,
    user.refreshToken,
  );

  if (!isValid) throw new UnauthorizedException();

  const newAccessToken = this.jwtService.sign({
    sub: user.id,
    role: user.role,
  });

  return { accessToken: newAccessToken };
}
```

---

# 🛡️ 6️⃣ Segurança real

## ✅ Hash forte (argon2)

Você já está usando ✔️

---

## ✅ Nunca retornar senha

```ts
return { id: user.id, email: user.email }; // OK
```

---

## ✅ ValidationPipe global

## 📁 `main.ts`

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

---

## ✅ Exception filter global

## 📁 `common/filters/http-exception.filter.ts`

```ts
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).json({
      message: exception.message || 'Internal server error',
    });
  }
}
```

---

## 📁 `main.ts`

```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

---

# 🎯 7️⃣ RBAC (roles avançado)

Você já tem base, mas pode melhorar:

```ts
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
```

---

# 🚀 8️⃣ Interceptor global (resposta padrão)

## 📁 `common/interceptors/transform.interceptor.ts`

```ts
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
```

---

## 📁 `main.ts`

```ts
app.useGlobalInterceptors(new TransformInterceptor());
```

---

# 📊 9️⃣ Logs profissionais

```ts
app.useLogger(['log', 'error', 'warn']);
```

Ou usar `pino` depois.

---

# 🔥 🔥 10️⃣ Checklist produção

✔ DTO com validação
✔ JWT com expiração
✔ Refresh token
✔ Hash seguro (argon2)
✔ Roles (RBAC)
✔ Guards
✔ Exception filter
✔ Interceptors
✔ Config com .env
✔ Prisma modular

---

# 🧠 O que você construiu

Você agora tem:

* 🔐 Sistema de autenticação completo
* 🛡️ Controle de acesso por roles
* 🔁 Sessão com refresh token
* 🧱 Arquitetura modular profissional
* ⚙️ Configuração segura

---

# 🚀 Próximo nível (real MESMO)

Se quiser ir além:

* 🔥 Rate limiting (anti brute force)
* 🔥 Email verification
* 🔥 Reset password
* 🔥 OAuth (Google login)
* 🔥 Multi-tenant
* 🔥 Docker + deploy

---

Se quiser, posso te montar um **projeto completo estilo boilerplate profissional**, com tudo isso já integrado e pronto pra rodar.


Perfeito. Agora vamos montar um **starter completo de autenticação + usuários + roles + JWT**, pronto pra rodar em nível produção. 🚀

Vou te entregar **todos os arquivos essenciais já prontos**.

---

# 🧱 1️⃣ USER MODULE

## 📁 `src/user/user.module.ts`

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

---

## 📁 `src/user/user.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await argon2.hash(data.password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateRefreshToken(userId: number, token: string) {
    const hashed = await argon2.hash(token);

    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }
}
```

---

# 🔐 2️⃣ AUTH MODULE

## 📁 `src/auth/auth.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { PasswordService } from '../common/crypto/password.service.js';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PasswordService],
})
export class AuthModule {}
```

---

## 📁 `src/auth/auth.service.ts`

```ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../common/crypto/password.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.userService.findByEmail(data.email);
    if (existing) throw new BadRequestException('User already exists');

    const user = await this.userService.create(data);
    return { id: user.id, email: user.email };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await this.passwordService.compare(
      data.password,
      user.password,
    );

    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
```

---

## 📁 `src/auth/auth.controller.ts`

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
```

---

# 🔑 3️⃣ JWT STRATEGY

## 📁 `src/auth/strategies/jwt.strategy.ts`

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}
```

---

# 🛡️ 4️⃣ JWT AUTH GUARD

## 📁 `src/auth/guards/jwt-auth.guard.ts`

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

---

# 📦 5️⃣ DTOs

## 📁 `src/auth/dto/register.dto.ts`

```ts
import { IsEmail, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;
}
```

---

## 📁 `src/auth/dto/login.dto.ts`

```ts
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

---

# 🧱 6️⃣ APP MODULE FINAL

## 📁 `src/app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { AdminModule } from './admin/admin.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
  ],
})
export class AppModule {}
```

---

# 🧪 7️⃣ TESTE FINAL

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"123456"}'
```

---

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"123456"}'
```

---

# 🚀 RESULTADO

Você agora tem:

✅ Login com JWT
✅ Refresh token
✅ Hash com argon2
✅ DTO com validação
✅ Arquitetura modular
✅ Base pronta pra RBAC (roles)
✅ Pronto pra produção

---

# 🔥 Próximo upgrade (top nível)

Se quiser evoluir ainda mais:

* 🔐 Logout (invalidate refresh token)
* 🔁 Refresh endpoint
* 📧 Verificação de email
* 🔑 Reset de senha
* 🚫 Rate limit (anti brute force)
* 🐳 Docker + deploy

---

Se quiser, posso te gerar agora:

👉 **sistema completo de roles + permissões (RBAC avançado tipo empresa)**
ou
👉 **deploy com Docker + banco + ambiente pronto**

Só fala 😄

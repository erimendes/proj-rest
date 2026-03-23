#!/bin/bash

PROJECT_NAME="minha-api-v5"

echo "🚀 Criando projeto NestJS..."
nest new $PROJECT_NAME --package-manager npm --skip-git --skip-install

cd $PROJECT_NAME || exit

echo "📦 Instalando dependências base..."
npm install

echo "📦 Instalando dependências principais..."

# Prisma
npm install prisma --save-dev
npm install @prisma/client
npm install @prisma/adapter-pg

# Config
npm install @nestjs/config

# Auth / JWT
npm install @nestjs/jwt @nestjs/passport passport passport-jwt

# Segurança
npm install argon2

# Validação
npm install class-validator class-transformer

echo "🏗️ Inicializando Prisma..."
npx prisma init

#########################################
echo "📁 Criando estrutura de pastas..."
#########################################

# Features
mkdir -p src/auth/{dto,guards,strategies}
mkdir -p src/user
mkdir -p src/post
mkdir -p src/admin

# Core
mkdir -p src/prisma
mkdir -p src/config

# Common (compartilhado)
mkdir -p src/common/{crypto,decorators,guards,filters,interceptors,pipes,utils,constants,types}

#########################################
echo "📄 Criando arquivos base..."
#########################################

# Prisma Service
cat <<EOF > src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.\$connect();
  }
}
EOF

# Prisma Module
cat <<EOF > src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
EOF

# Password Service
cat <<EOF > src/common/crypto/password.service.ts
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
EOF

# Roles Decorator
cat <<EOF > src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
EOF

# Roles Guard
cat <<EOF > src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();
    return roles.includes(user?.role);
  }
}
EOF

# .env exemplo
cat <<EOF > .env
DATABASE_URL="postgresql://user:password@localhost:5432/nestdb"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1h"
EOF

#########################################
echo "⚙️ Ajustando main.ts (ValidationPipe)..."
#########################################

cat <<EOF > src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
EOF

#########################################
echo "✅ Projeto $PROJECT_NAME pronto para produção!"
echo "👉 Próximo passo: configurar Prisma schema e rodar migrate"
#########################################




#########################################
# Editar o arquivo prisma/schema.prisma
#########################################
cat > prisma/schema.prisma <<EOF
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum Role{
  USER
  ADMIN
  MANAGER
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean? @default(false)
  authorId  Int?
  author    User?    @relation(fields: [authorId], references: [id])
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  createdAt   DateTime @default(now())
}
EOF

#########################################
# Criar .env
#########################################
cat > .env <<EOF
# Exemplo para o seu Docker Compose local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb?schema=public"

EOF

####################################
echo "📦 Gerando Prisma Client..."
####################################
npx prisma generate

####################################
# Criar src/prisma.service.ts
####################################
cat > src/prisma.service.ts <<EOF
// src/prisma.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
EOF

####################################
echo "📦 Criar src/users/user.service.ts  "
####################################
cat > src/users/user.service.ts <<EOF
// src/users/user.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { User, Prisma } from "../generated/prisma/client.js";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // 1. Verificação de senha (o argon2 precisa de uma string)
    if (!data.password || typeof data.password !== 'string') {
      throw new Error('Password is required and must be a string');
    }

    // 2. Criptografia
    const hashedPassword = await argon2.hash(data.password);

    // 3. Criação no banco
    return this.prisma.user.create({
      data: {
        ...data, // Espalha os outros campos (email, name, etc)
        password: hashedPassword, // Sobrescreve a senha plana pela hash
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
EOF

####################################
# Criar src/post.service.ts
####################################
cat > src/post.service.ts <<EOF
// src/post.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { Post, Prisma } from "./generated/prisma/client.js";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
EOF

####################################
# Replace AppModule
####################################
cat > src/app.module.ts <<EOF
// src/app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service.js"; 
import { PostService } from "./post.service.js"; 
import { ProductsModule } from './products/products.module.js';
import { AuthModule } from "./auth/auth.module.js";
import { AdminController } from "./admin/admin.controller.js";

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, AuthModule],
  controllers: [AppController, AdminController],
  providers: [
    PrismaService,  
    PostService], 
})
export class AppModule {}
EOF

####################################
# Replace AppController
####################################
cat > src/app.controller.ts <<EOF
// src/app.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { PostService } from "./post.service.js";
import { Post as PostModel } from "./generated/prisma/client.js";

@Controller()
export class AppController {
  constructor(
    // private readonly UserService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get()
  async getData(): Promise<{ message: string }> {
    return { message: "Aplicação rodando!" };
  }

  @Get("post/:id")
  async getPostById(@Param("id") id: string): Promise<PostModel | null> {
    return this.postService.post({ id: Number(id) });
  }

  @Get("feed")
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(@Param("searchString") searchString: string): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post("post")
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put("publish/:id")
  async publishPost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete("post/:id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
EOF

####################################
# Replace main.ts
####################################
cat > src/main.ts <<EOF
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
EOF

####################################
# Replace package.json
####################################
npm pkg set type="module"

####################################
# Criar o módulo de produtos
echo "🔧 Criando módulo de produtos..."
####################################
npx nest g module products

####################################
# Criar o serviço de produtos
echo "🔧 Criando serviço de produtos..."
####################################
npx nest g service products

####################################
# Criar o controlador de produtos
echo "🔧 Criando controlador de produtos..."
####################################
npx nest g controller products

####################################
# atualizar o /src/products/products.module.ts
echo "🔧 Configurando módulo de produtos..."
####################################
cat > src/products/products.module.ts <<EOF
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService], // Adicione o PrismaService aqui
})
export class ProductsModule {}
EOF

####################################
# atualizar o /src/products/products.service.ts
echo "🔧 Configurando serviço de produtos..."
####################################
cat > src/products/products.service.ts <<EOF
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Product, Prisma } from '../generated/prisma/client.js'; 

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }
}
EOF

####################################
# atualizar o /src/products/products.controller.ts
echo "🔧 Configurando controller de produtos..."
####################################
cat > src/products/products.controller.ts <<EOF
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products') // A URL será http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: { name: string; price: number; description?: string }) {
    return this.productsService.createProduct(data);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
}
EOF

#########################################
echo Parte 3: Implementar Argon2, JWT e Passport
#########################################
npm install argon2 @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @types/passport-jwt --save-dev

#########################################
echo Criar arquivo roles.decorator.ts
#########################################
cat > src/common/decorators/roles.decorator.ts <<EOF
// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/generated/prisma/enums.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
EOF

#########################################
echo Criar arquivo roles.guard.ts
#########################################
cat > src/common/guards/roles.guard.ts <<EOF
// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';  
import { Role } from '../../generated/prisma/enums.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user?.role);
  }
}
EOF

#########################################
echo Criar arquivo password.service.ts
#########################################
cat > src/common/crypto/password.service.ts <<EOF
// src/common/crypto/password.service.ts
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
EOF

#########################################
echo Criar arquivo register.dto.ts
#########################################
cat > src/auth/dto/register.dto.ts <<EOF
// src/auth/dto/register.dto.ts
import { IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // agora o role é aceito
}
EOF

#########################################
echo Criar arquivo login.dto.ts
#########################################
cat > src/auth/dto/login.dto.ts <<EOF
// src/auth/dto/login.dto.ts
export class LoginDto {
  email: string;
  password: string;
}
EOF

#########################################
echo Criar arquivo auth.service.ts
#########################################
cat > src/auth/auth.service.ts <<EOF
// src/auth/auth.service.ts
// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,     // 400
  UnauthorizedException,   // 401
  ForbiddenException,      // 403
  NotFoundException,       // 404
} from '@nestjs/common';
import { UserService } from '../users/user.service.js';
import { PasswordService } from '../common/crypto/password.service.js';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.userService.user({ email: data.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser(data);

    return { id: user.id, email: user.email };
  }

  async login(data: LoginDto) {
    const user = await this.userService.user({ email: data.email });
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

    // 🔹 Aqui adicionamos a role no payload
    const payload = { sub: user.id, email: user.email, role: user.role };

    return { access_token: this.jwtService.sign(payload) };
  }
}
EOF 

#########################################
echo Criar arquivo auth.controller.ts
#########################################
cat > src/auth/auth.controller.ts <<EOF
// src/auth/auth.controller.ts
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
EOF

#########################################
echo Criar arquivo jwt.strategy.ts
#########################################
cat > src/auth/strategies/jwt.strategy.ts <<EOF
// src/auth/strategies/jwt.strategy.ts
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
    // 🔹 Retorna user completo para request.user
    // Assim, RolesGuard consegue ler user.role
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
EOF

#########################################
echo Criar arquivo jwt-auth.guard.ts
#########################################
cat > src/auth/guards/jwt-auth.guard.ts <<EOF
// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
EOF

#########################################
echo Criar arquivo auth.module.ts
#########################################
cat > src/auth/auth.module.ts <<EOF
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../users/user.service.js';
import { PrismaService } from '../prisma.service.js';
import { PasswordService } from '../common/crypto/password.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';

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
EOF

#########################################
echo Criar arquivo register.dto.ts
#########################################
cat > src/auth/dto/register.dto.ts <<EOF
// src/auth/dto/register.dto.ts
import { IsEmail, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  name?: string;
}
EOF

#########################################
echo Criar arquivo login.dto.ts
#########################################
cat > src/auth/dto/login.dto.ts <<EOF
// src/auth/dto/login.dto.ts
import { IsEmail, MinLength } from 'class-validator'; 

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
EOF

#########################################
echo Criar arquivo admin.controller.ts
#########################################
cat > src/admin/admin.controller.ts <<EOF
// src/admin/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // precisa estar logado e ter role
export class AdminController {
  @Get()
  @Roles(Role.ADMIN)
  getAdminData() {
    return { secret: 'Only admins can see this' };
  }

  @Get('manager')
  @Roles(Role.MANAGER, Role.ADMIN)
  getManagerData() {
    return { secret: 'Admins and managers can see this' };
  }
}
EOF



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







# npx prisma db pull
# npx prisma migrate dev --name init

# curl -X POST http://localhost:3000/auth/register \
#   -H "Content-Type: application/json" \
#   -d '{"email":"test@test.com","password":"123456"}'

# curl -X POST http://localhost:3000/auth/login \
#   -H "Content-Type: application/json" \
#   -d '{"email":"test@test.com","password":"123456"}'

# curl -X POST http://localhost:3000/user \
#   -H "Content-Type: application/json" \
#   -d '{"name": "Francisco", "email": "francisco@prisma.io", "password": "senha123"}'


# curl -X POST http://localhost:3000/products \
#   -H "Content-Type: application/json" \
#   -d '{"name": "Teclado Wifi", "price": 400.00, "description": "Bluetooth e Switch Blue"}'

# tree prisma
# prisma
# ├── dev.db
# ├── migrations
# │   └── 20201207100915_init
# │       └── migration.sql
# └── schema.prisma

# tree src
# src/
# ├── app.module.ts
# ├── main.ts
# │
# ├── auth/
# │   ├── auth.module.ts
# │   ├── auth.controller.ts
# │   ├── auth.service.ts
# │   ├── strategies/
# │   │   └── jwt.strategy.ts
# │   ├── guards/
# │   │   └── jwt-auth.guard.ts
# │   └── dto/
# │       ├── login.dto.ts
# │       └── register.dto.ts
# │
# ├── user/
# │   ├── user.module.ts
# │   ├── user.controller.ts
# │   ├── user.service.ts
# │   └── dto/
# │       ├── create-user.dto.ts
# │       └── update-user.dto.ts
# │
# ├── prisma/
# │   ├── prisma.module.ts
# │   └── prisma.service.ts
# │
# ├── common/
# │   ├── crypto/
# │   │   ├── crypto.module.ts
# │   │   └── password.service.ts
# │   │
# │   ├── guards/
# │   │   ├── roles.guard.ts
# │   │   └── optional-auth.guard.ts
# │   │
# │   ├── decorators/
# │   │   ├── roles.decorator.ts
# │   │   ├── public.decorator.ts
# │   │   └── user.decorator.ts
# │   │
# │   ├── interceptors/
# │   │   └── transform.interceptor.ts
# │   │
# │   ├── filters/
# │   │   └── http-exception.filter.ts
# │   │
# │   ├── pipes/
# │   │   └── validation.pipe.ts
# │   │
# │   ├── utils/
# │   │   ├── date.util.ts
# │   │   └── string.util.ts
# │   │
# │   ├── constants/
# │   │   └── roles.constant.ts
# │   │
# │   └── types/
# │       └── user-request.type.ts
# │
# └── config/
#     ├── env.config.ts
#     └── jwt.config.ts



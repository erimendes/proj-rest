#!/bin/bash

# Define o nome do projeto em uma variável para fácil alteração
PROJECT_NAME="minha-api-v4"

echo "🚀 Criando projeto NestJS..."
# Cria o projeto usando o CLI do NestJS
# --package-manager npm: Força o uso do NPM
# --skip-git: Não inicia um repositório Git automaticamente
# --skip-install: Não instala as dependências padrão agora (faremos depois tudo junto)
nest new $PROJECT_NAME --package-manager npm --skip-git --skip-install

# Entra na pasta do projeto recém-criado
cd $PROJECT_NAME

echo "🔧 Instalando dependências do NestJS e Prisma..."
# Instala as dependências base do projeto (que pulamos no comando 'nest new')
npm install

# Instala o Prisma como dependência de desenvolvimento (CLI)
npm install prisma --save-dev

# Instala o Prisma Client (o que o seu código usa para fazer queries)
npm install @prisma/client
npm install @prisma/adapter-pg
npm install @nestjs/config
npm install class-validator class-transformer
echo "🏗️ Inicializando o Prisma..."
# Inicializa a estrutura do Prisma (cria a pasta /prisma e o arquivo .env)
npx prisma init

echo "✅ Projeto $PROJECT_NAME configurado com sucesso!"

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
# Criar src/user.service.ts
####################################
cat > src/user.service.ts <<EOF
// src/user.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { User, Prisma } from "./generated/prisma/client.js";
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
import { AppService } from "./app.service.js";
import { PrismaService } from "./prisma.service.js"; 
import { UserService } from "./user.service.js"; 
import { PostService } from "./post.service.js"; 
import { ProductsModule } from './products/products.module.js';
import { AuthModule } from "./auth/auth.module.js";
import { AdminController } from "./admin/admin.controller.js";

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, AuthModule],
  controllers: [AppController, AdminController],
  providers: [AppService, PrismaService, UserService, PostService], 
})
export class AppModule {}
EOF

####################################
# Replace AppController
####################################
cat > src/app.controller.ts <<EOF
// src/app.controller.ts
// src/app.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { PostService } from "./post.service.js";
import { User as UserModel } from "./generated/prisma/client.js";
import { Post as PostModel } from "./generated/prisma/client.js";

@Controller()
export class AppController {
  constructor(
    private readonly UserService: UserService,
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

  @Post("user")
  async signupUser(@Body() userData: { name?: string; email: string; password: string }): Promise<UserModel> {
    return this.UserService.createUser(userData);
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
echo Criar pasta common/crypto
#########################################
mkdir -p src/common/crypto

#########################################
echo Criar pasta common/decorators
#########################################
mkdir -p src/common/decorators

#########################################
echo Criar pasta common/guards
#########################################
mkdir -p src/common/guards

#########################################
echo Criar pasta strategies
#########################################
mkdir -p src/auth/strategies

#########################################
echo Criar pasta guards
#########################################
mkdir -p src/auth/guards

#########################################
echo Criar pasta dto
#########################################
mkdir -p src/auth/dto

#########################################
echo Criar pasta admin
#########################################
mkdir -p src/admin

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
import { UserService } from '../user.service.js';
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
import { UserService } from '../user.service.js';
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



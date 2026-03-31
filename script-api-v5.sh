#!/bin/bash
set -e
PROJECT_NAME="minha-api-v5"

echo "🚀 Criando projeto NestJS..."
# Criamos o projeto pulando o install para configurar as travas de versão antes
npx @nestjs/cli new $PROJECT_NAME --package-manager npm --skip-git --skip-install

cd $PROJECT_NAME || exit

echo "⚙️ Configurando ambiente para evitar conflitos de versão..."
# Isso evita que o 'nest g res' trave no meio por causa do class-validator
npm config set legacy-peer-deps true

echo "📦 Instalando dependências..."

# Instalação em bloco (mais rápido e seguro)
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt \
            argon2 class-validator class-transformer @nestjs/mapped-types \
            @prisma/client @prisma/adapter-pg

npm install prisma --save-dev

#########################################
echo "⚙️ Configurando tsconfig.json..."
#########################################
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false,
    "types": ["node", "jest"],      // Opcional mas bom: limita o escopo de tipos globais
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

echo "🏗️ Inicializando Prisma..."
npx prisma init --datasource-provider postgresql

# # Remover arquivos padrão que não serão usados
# echo "🧹 Limpando arquivos padrão..."
# rm src/app.service.ts
# rm src/app.controller.ts

echo "📁 Gerando Resources (Resources) com base no schema.prisma..."

# --- MÓDULO DE PRODUTOS / CARDÁPIO ---
# Products: Product
npx nest g res products --no-spec --no-flat        # 🔹 Incluído ProductsModule
# Category: Category
npx nest g res category --no-spec --no-flat        # 🔹 Incluído CategoryModule

# --- MÓDULO DE USUÁRIOS ---
# User: User
npx nest g res user --no-spec --no-flat            # 🔹 Incluído UserModule

# --- MÓDULO DE POSTAGENS ---
# Post: Post
npx nest g res post --no-spec --no-flat            # 🔹 Incluído PostModule

# --- MÓDULO DE ATENDIMENTO ---
# Table: Table
npx nest g res table --no-spec --no-flat           # 🔹 Incluído TableModule

# --- MÓDULO DE PEDIDOS ---
# Order: Order (inclui OrderItem internamente)
npx nest g res order --no-spec --no-flat           # 🔹 Incluído OrderModule

# --- MÓDULO DE ADMIN ---
# Admin: para funções administrativas gerais
npx nest g res admin --no-spec --no-flat           # 🔹 Incluído AdminModule


# 1. Criar o Service (Lógica)
cat <<'EOF' > src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Minha API Rest',
      version: '1.0.0',
      description: 'API de gerenciamento de pedidos e usuários',
      status: 'online',
      timestamp: new Date().toISOString()
    };
  }
}
EOF

# 2. Criar o Controller (Rota)
cat <<'EOF' > src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller() // Vazio para responder na raiz '/'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
EOF

# Sobrescreve o app.module.ts para remover as referências aos arquivos deletados
cat <<EOF > src/app.module.ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// 🔹 AppController
import { AppController } from './app.controller.js'

// 🔹 AppService
import { AppService } from './app.service.js'

// 🔹 Prisma
import { PrismaModule } from './prisma/prisma.module.js';

// 🔹 Módulos de recursos
import { ProductsModule } from './products/products.module.js';   // Products / Product
import { CategoryModule } from './category/category.module.js';   // Category
import { UserModule } from './user/user.module.js';               // User
import { PostModule } from './post/post.module.js';               // Post
import { TableModule } from './table/table.module.js';            // Table
import { OrderModule } from './order/order.module.js';            // Order / OrderItem
import { AdminModule } from './admin/admin.module.js';            // Admin

// 🔹 Módulo de Autenticação (Auth)
import { AuthModule } from './auth/auth.module.js';               // Auth (login, JWT, guards)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 🔹 Core
    PrismaModule,

    // 🔹 Recursos do schema
    ProductsModule,    // Product
    CategoryModule,    // Category
    UserModule,        // User
    PostModule,        // Post
    TableModule,       // Table
    OrderModule,       // Order / OrderItem
    AdminModule,       // Admin

    // 🔹 Autenticação
    AuthModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
EOF

# Criando pastas extras para organização
echo "📁 Criando estrutura Common e Auth..."
mkdir -p src/auth/{dto,guards,strategies}
mkdir -p src/common/{crypto,decorators,guards,filters,interceptors,pipes,utils,constants,types}
mkdir -p src/prisma
mkdir -p src/config

echo "✅ Projeto '$PROJECT_NAME' configurado com sucesso!"
echo "💡 Próximo passo: Configure o DATABASE_URL no seu arquivo .env"

#########################################
echo "📄 Criando arquivos base..."
echo " Criando src/prisma.service.ts"
####################################
cat > src/prisma/prisma.service.ts <<EOF
// src/prisma/prisma.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client.js";
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

echo "🔥 PrismaModule (centralizado)"
cat > src/prisma/prisma.module.ts <<EOF
// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // 🔥 disponível em toda a aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
EOF

#########################################
echo "Criando .env"
#########################################
cat > .env <<EOF
# Exemplo para o seu Docker Compose local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb?schema=public"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1h"
EOF

#########################################
echo "⚙️ Ajustando main.ts (ValidationPipe)..."
#########################################


####################################
echo "🔧 Replace main.ts"
####################################
cat > src/main.ts <<EOF
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita o CORS para que o navegador aceite os dados
  app.enableCors();
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

#########################################
echo "✅ Projeto $PROJECT_NAME pronto para produção!"
echo "👉 Próximo passo: configurar Prisma schema e rodar migrate"
#########################################



#########################################
echo "🔧 Editando o arquivo prisma/schema.prisma"
#########################################
cat > prisma/schema.prisma <<EOF
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- MÓDULO DE USUÁRIOS ---
model User {
  id          String      @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role{
  USER
  ADMIN
  MANAGER
  WAITER
  CHEF
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean? @default(false)
  authorId  String?
  author    User?    @relation(fields: [authorId], references: [id])
}

// --- MÓDULO DE CARDÁPIO ---
model Category {
  id       String    @id @default(uuid())
  name     String
  products Product[]
}

model Product {
  id          String      @id @default(uuid())
  name        String      @unique
  description String?
  price       Decimal     @db.Decimal(10, 2)
  imageUrl    String?
  categoryId  String
  category    Category    @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
}

// --- MÓDULO DE ATENDIMENTO ---
model Table {
  id       String      @id @default(uuid())
  number   Int         @unique
  status   TableStatus @default(FREE)
  orders   Order[]
}

enum TableStatus {
  FREE
  OCCUPIED
  RESERVED
}

// --- MÓDULO DE PEDIDOS ---
model Order {
  id          String      @id @default(uuid())
  tableId     String
  table       Table       @relation(fields: [tableId], references: [id])
  userId      String      // Garçom que abriu o pedido
  user        User        @relation(fields: [userId], references: [id])
  status      OrderStatus @default(PENDING)
  totalPrice  Decimal     @default(0) @db.Decimal(10, 2)
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id          String  @id @default(uuid())
  status      String   @default("PENDING")
  orderId     String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  quantity    Int
  unitPrice   Decimal @db.Decimal(10, 2)
  observation String? // Ex: "Sem gelo", "Bem passado"

  createdAt   DateTime @default(now()) 

  @@map("order_items")
}

enum OrderStatus {
  PENDING
  PREPARING
  READY
  CLOSED
  DELIVERED
  CANCELED
}
EOF


####################################
echo "📦 Gerando Prisma Client..."
####################################
npx prisma generate

#########################################
echo "📦 Criando primeira migração..."
#########################################
npx prisma migrate reset
npx prisma migrate dev --name init

####################################
echo "📦 Criando arquivo src/user/user.service.ts  "
####################################
cat > src/user/user.service.ts <<EOF
// src/user/user.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { User, Prisma } from "../generated/prisma/client.js";
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async findAll(params: {
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
    // Validação básica
    if (!data.password || typeof data.password !== 'string') {
      throw new BadRequestException('Password is required and must be a string');
    }

    // Criptografia
    const hashedPassword = await argon2.hash(data.password);

    // Criação segura
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    // Se houver senha na atualização, também precisa de Hash!
    if (data.password && typeof data.password === 'string') {
      data.password = await argon2.hash(data.password);
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
EOF

echo "🔧 criando src/user/user.controller.ts"
cat > src/user/user.controller.ts <<EOF
// src/user/user.controller.ts
import { Controller, Get, Patch, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Removido o @Post() create, pois o registro é via /auth/register

  @Get()
  findAll() {
    return this.userService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({
      where: { id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
EOF

echo "🔧 Criando src/post/post.service.ts"
cat > src/post/post.service.ts <<EOF
// src/post/post.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { Post, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Renomeado para findOne para manter o padrão do projeto
  async post(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where });
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
    return this.prisma.post.create({ data });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({ data, where });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where });
  }
}
EOF

echo "🔧 Criando // src/post/post.controller.ts"
cat > src/post/post.controller.ts <<'EOF'
// src/post/post.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    // O service 'posts' espera um objeto de parâmetros (mesmo que vazio)
    return this.postService.posts({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.post({ id }); // ✅ string
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost({
      where: { id }, // ✅ string
      data: updatePostDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost({ id }); // ✅ string
  }
}
EOF

echo "🔧 Criando src/post/dto/create-post.dto.ts"
cat > src/post/dto/create-post.dto.ts <<EOF
// src/post/dto/create-post.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string; // Este é o campo que o erro dizia estar faltando

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  // Se o post precisar de um autor na criação:
  @IsOptional()
  authorId?: number;
}
EOF

echo "🔧 Criando src/post/dto/update-post.dto.ts"
cat > src/post/dto/update-post.dto.ts <<EOF
// src/post/dto/update-post.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto.js';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
EOF

####################################
echo "🔧 Replace package.json"
####################################
npm pkg set type="module"

####################################
# atualizar o /src/products/products.module.ts
echo "🔧 Configurando módulo de produtos..."
####################################
cat > src/products/products.module.ts <<EOF
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

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
// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price, // O Prisma lida com a conversão para Decimal se for number/string válida
        imageUrl: data.imageUrl,
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true }, // Opcional: traz os dados da categoria junto
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { name: { contains: query, mode: 'insensitive' } } }
        ]
      },
      include: {
        category: true // Para mostrar a qual categoria o achado pertence
      }
    });
  }
}
EOF

####################################
# atualizar o /src/products/products.controller.ts
echo "🔧 Configurando controller de produtos..."
####################################
cat > src/products/products.controller.ts <<EOF
// src/products/products.controller
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js'; // Removi o .js se estiver usando TS padrão
import { CreateProductDto } from './dto/create-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    // Certifique-se de que o método no service se chama 'create' ou 'createProduct'
    return this.productsService.create(data); 
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.productsService.search(q);
  }
}
EOF

#########################################
echo "🔧 Parte 3: Implementar Argon2, JWT e Passport"
#########################################
npm install argon2 @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @types/passport-jwt --save-dev

#########################################
echo "🔧 Criando arquivo register.dto.ts"
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
echo "🔧 Criando arquivo login.dto.ts"
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
echo "🔧 Criando arquivo auth.service.ts"
#########################################
cat <<EOF > src/auth/auth.service.ts
// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,     // 400
  UnauthorizedException,   // 401
  ForbiddenException,      // 403
  NotFoundException,       // 404
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
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
    const existingUser = await this.userService.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser(data);

    return { id: user.id, email: user.email };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findOne({ email: data.email });
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

    // --- ALTERAÇÃO AQUI ---
    return { 
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // Se o seu modelo de usuário tiver 'name'
        role: user.role
      }
    };
  }
}
EOF

#########################################
echo "🔧 Criando arquivo auth.controller.ts"
#########################################
cat <<EOF > src/auth/auth.controller.ts
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
echo "🔧 Criando arquivo jwt.strategy.ts"
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
echo "🔧 Criando arquivo jwt-auth.guard.ts"
#########################################
cat > src/auth/guards/jwt-auth.guard.ts <<EOF
// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
EOF

#########################################
echo "🔧 Criando arquivo auth.module.ts"
#########################################
cat > src/auth/auth.module.ts <<EOF
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
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
echo "🔧 Criando arquivo admin.controller.ts"
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


#########################################
echo "🔧 Criando arquivo user.module.ts"
#########################################
cat > src/user/user.module.ts <<EOF
// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 🔥 usado no AuthModule
})
export class UserModule {}
EOF


echo "🔧 Criando arquivo post.module.ts"
cat > src/post/post.module.ts <<EOF
// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { PostService } from './post.service.js';
import { PostController } from './post.controller.js';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
EOF

echo "🔧 Criando arquivo admin.module.ts"
cat > src/admin/admin.module.ts <<EOF
// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller.js';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
EOF

#########################################
echo "🔧 Criar arquivo password.service.ts"
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
echo "🔧 Criando arquivo roles.decorator.ts"
#########################################
cat > src/common/decorators/roles.decorator.ts <<EOF
// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../generated/prisma/enums.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
EOF


#########################################
echo "🔧 Criando arquivo roles.guard.ts"
#########################################
cat <<EOF > src/common/guards/roles.guard.ts
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

echo "🔧 Correções finais e estrutura limpa..."

#########################################
# ADMIN
#########################################
cat <<'EOF' > src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { UpdateAdminDto } from './dto/update-admin.dto.js';

@Injectable()
export class AdminService {
  create(dto: CreateAdminDto) { return 'add admin'; }
  findAll() { return 'all admins'; }
  findOne(id: number) { return `admin #${id}`; }
  update(id: number, dto: UpdateAdminDto) { return `update admin #${id}`; }
  remove(id: number) { return `remove admin #${id}`; }
}
EOF

cat <<'EOF' > src/admin/dto/update-admin.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto.js';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
EOF

#########################################
# CATEGORY
#########################################
cat <<'EOF' > src/category/category.controller.ts
// src/category/category.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Removido o + pois o ID é String (UUID)
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    // Removido o + pois o ID é String (UUID)
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Removido o + pois o ID é String (UUID)
    return this.service.remove(id);
  }
}
EOF

cat <<'EOF' > src/category/category.service.ts
// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { products: true }, // Opcional: traz os produtos da categoria
    });
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
EOF

cat <<'EOF' > src/category/dto/update-category.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto.js';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
EOF

cat <<'EOF' > src/category/dto/create-category.dto.ts
// src/category/dto/create-category.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name: string;
}
EOF

#########################################
# ORDER (SEM DUPLICAÇÃO ❗)
#########################################
cat <<'EOF' > src/order/order.service.ts
// src/order/order.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { AddItemDto } from './dto/add-item.dto.js';
import { OrderStatus } from '../generated/prisma/enums.js';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar pedido
  async create(dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Criar a comanda (Order)
      const order = await tx.order.create({
        data: {
          table: { connect: { id: dto.tableId } },
          user: { connect: { id: dto.userId } },
          status: 'PENDING',
        },
      });

      // 2. Garantir que a mesa está OCCUPIED (não importa se já estava)
      await tx.table.update({
        where: { id: dto.tableId },
        data: { status: 'OCCUPIED' },
      });

      return order;
    });
  }

  // 2. O MÉTODO QUE ESTAVA FALTANDO (findAll)
  async findAll() {
    return this.prisma.order.findMany({
      include: { 
        table: true, 
        user: { select: { name: true } },
        _count: { select: { items: true } } 
      },
    });
  }

  // 3. Buscar um pedido específico
  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { 
        items: { include: { product: true } }, 
        table: true,
        user: { select: { name: true } }
      },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  // 4. Adicionar item (com cálculo de total)
  async addItem(dto: AddItemDto) {
    try {
      console.log('--- Tentativa de Adicionar Item ---');
      console.log('Dados recebidos:', dto);

      const product = await this.prisma.product.findUnique({ 
        where: { id: dto.productId } 
      });

      if (!product) {
        console.error('❌ Produto não encontrado:', dto.productId);
        throw new NotFoundException('Produto não encontrado');
      }

      // Criar o item (sem transaction por enquanto para isolar o erro)
      const newItem = await this.prisma.orderItem.create({
        data: {
          orderId: dto.orderId,
          productId: dto.productId,
          quantity: dto.quantity,
          unitPrice: product.price,
          observation: dto.observation || null,
        },
      });

      console.log('✅ Item criado com sucesso no banco:', newItem.id);

      // Atualizar o total da Order
      const allItems = await this.prisma.orderItem.findMany({
        where: { orderId: dto.orderId }
      });

      const newTotal = allItems.reduce((acc, item) => {
        return acc + (Number(item.unitPrice) * item.quantity);
      }, 0);

      await this.prisma.order.update({
        where: { id: dto.orderId },
        data: { totalPrice: newTotal }
      });

      return { message: 'Item adicionado', item: newItem };
    } catch (error) {
      console.error('❌ ERRO NO PRISMA AO ADICIONAR ITEM:', error);
      throw error;
    }
  }

  // Adicione este método ao seu src/order/order.service.ts
  async finishOrder(id: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fecha a comanda (Order) atual
      const finishedOrder = await tx.order.update({
        where: { id },
        data: { status: 'DELIVERED' },
      });

      // 2. Conta quantas comandas AINDA NÃO FORAM FINALIZADAS nesta mesa específica
      const openOrdersCount = await tx.order.count({
        where: {
          tableId: finishedOrder.tableId,
          status: { 
            notIn: ['DELIVERED', 'CANCELED'] // Se não estiver entregue nem cancelada, está aberta
          },
        },
      });

      // 3. Só libera a mesa se o contador de comandas abertas for ZERO
      if (openOrdersCount === 0) {
        await tx.table.update({
          where: { id: finishedOrder.tableId },
          data: { status: 'FREE' },
        });
      }

      return finishedOrder;
    });
  }

  async findOpenByTable(tableId: string) {
    try {
      // Fazemos a busca de forma mais simples primeiro para testar
      const orders = await this.prisma.order.findMany({
        where: {
          tableId: tableId,
          // Vamos buscar todos os pedidos da mesa que NÃO foram entregues ou cancelados
          NOT: {
            status: { in: ['DELIVERED', 'CANCELED'] }
          }
        },
        include: {
          // Garanta que esses nomes ('items', 'product') sejam IGUAIS ao seu schema.prisma
          items: {
            include: { 
              product: true 
            },
          },
        },
      });

      console.log(`Sucesso! Encontrados ${orders.length} pedidos para a mesa.`);
      return orders;
    } catch (error) {
      // ⚠️ OLHE O TERMINAL DO SEU VS CODE/NESTJS AGORA!
      // Ele vai imprimir o erro real do Prisma aqui:
      console.error("--- ERRO NO PRISMA DETECTADO ---");
      console.error(error.message); 
      
      throw new InternalServerErrorException("Erro interno no servidor ao buscar pedidos.");
    }
  }

  async getTableTotal(tableId: string) {
    const aggregate = await this.prisma.order.aggregate({
      where: {
        tableId: tableId,
        status: { notIn: ['DELIVERED', 'CANCELED'] },
      },
      _sum: {
        totalPrice: true,
      },
    });
    return { total: aggregate._sum.totalPrice || 0 };
  }


  async removeItem(orderItemId: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Busca o item para saber de qual pedido ele é antes de deletar
      const item = await tx.orderItem.findUnique({
        where: { id: orderItemId },
      });

      if (!item) throw new NotFoundException('Item não encontrado');

      // 2. Remove o item
      await tx.orderItem.delete({
        where: { id: orderItemId },
      });

      // 3. Recalcula o total dos itens restantes daquela Order
      const remainingItems = await tx.orderItem.findMany({
        where: { orderId: item.orderId },
      });

      const newTotal = remainingItems.reduce((acc, current) => {
        return acc + (Number(current.unitPrice) * current.quantity);
      }, 0);

      // 4. Atualiza o totalPrice da Order
      await tx.order.update({
        where: { id: item.orderId },
        data: { totalPrice: newTotal },
      });

      return { message: 'Item removido e total atualizado', newTotal };
    });
  }


  async getSalesReport() {
    // 1. Soma o faturamento total de todos os pedidos entregues
    const totalRevenue = await this.prisma.order.aggregate({
      where: { status: 'DELIVERED' },
      _sum: { totalPrice: true },
      _count: { id: true }
    });

    // 2. Ranking de produtos (quais saíram mais)
    const productSales = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: {
        _sum: { quantity: 'desc' }
      },
      take: 5, // Top 5 produtos
    });

    // 3. Busca os nomes dos produtos para o ranking ficar legível
    const reportWithNames = await Promise.all(
      productSales.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true }
        });
        return {
          name: product?.name,
          totalSold: item._sum.quantity
        };
      })
    );

    return {
      revenue: totalRevenue._sum.totalPrice || 0,
      totalOrders: totalRevenue._count.id,
      topProducts: reportWithNames
    };
  }

  async getKitchenQueue() {
    console.log('--- Iniciando busca na fila da cozinha ---');
    
    // 1. Busca simplificada ao extremo
    const allItems = await this.prisma.orderItem.findMany({
      where: {
        status: 'PENDING', // 👈 Busca itens que ainda não foram feitos
        order: {
          status: { in: ['PENDING', 'PREPARING'] } // Garante que a comanda ainda está aberta
        }
      },
      include: {
        product: true,
        order: {
          include: { table: true } // 👈 Para pegar o número da mesa real
        },
      },
    });

    // 2. Log no terminal do VS Code/NestJS para você ver o que está vindo
    console.log(`Total de itens encontrados no banco: ${allItems.length}`);
    
    // 3. Filtro manual via JavaScript (mais seguro que o do Banco para debug)
    const filtered = allItems.filter(item => 
      item.order.status === 'PENDING' || item.order.status === 'PREPARING'
    );

    console.log(`Itens após filtro PENDING/PREPARING: ${filtered.length}`);

    return allItems.map(item => ({
      id: item.id,
      orderId: item.orderId,
      productName: item.product.name,
      quantity: item.quantity,
      status: item.order.status,
      createdAt: item.createdAt,
      // Se sua mesa tiver o campo 'number', usamos ele, senão o ID
      tableNumber: item.order.table?.number || item.order.tableId 
    }));
  }

  // 🚀 MÉTODO ESSENCIAL: Finaliza o item sem fechar a mesa
  async markItemAsReady(itemId: string) {
    return await this.prisma.orderItem.update({
      where: { id: itemId },
      data: { status: 'READY' } 
    });
  }

  async updateStatus(id: string, status: OrderStatus) { // 👈 Mude de string para OrderStatus
    try {
      return await this.prisma.order.update({
        where: { id },
        data: { status } // Agora o Prisma aceita porque o tipo bate!
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw new BadRequestException('Não foi possível atualizar o status do pedido.');
    }
  }

  async closeOrder(orderId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({ where: { id: orderId } });
        if (!order) throw new NotFoundException('Pedido não encontrado');

        const updatedOrder = await tx.order.update({
          where: { id: orderId },
          data: { status: 'DELIVERED' },
        });

        const openOrders = await tx.order.count({
          where: {
            tableId: order.tableId,
            status: { notIn: ['DELIVERED', 'CANCELED'] }
          }
        });

        if (openOrders === 0) {
          await tx.table.update({
            where: { id: order.tableId },
            data: { status: 'FREE' },
          });
        }
        return updatedOrder;
      });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao fechar conta');
    }
  }
}
EOF

cat <<'EOF' > src/order/order.controller.ts
// src/order/order.controller.ts
import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { AddItemDto } from './dto/add-item.dto.js';
import { OrderStatus } from '../generated/prisma/enums.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Post('add-item') // 👈 Agora a rota /orders/add-item existe!
  addItem(@Body() dto: AddItemDto) {
    return this.service.addItem(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Adicione este método ao seu src/order/order.controller.ts

  @Patch(':id/finish')
  finishOrder(@Param('id') id: string) {
    return this.service.finishOrder(id);
  }

 @Patch(':id/status')
  // Note que removemos o ('status') de dentro do @Body
  updateStatus(
    @Param('id') id: string, 
    @Body() dto: UpdateStatusDto // 👈 Aqui ele valida o objeto inteiro
  ) {
    // Agora passamos dto.status para o service
    return this.service.updateStatus(id, dto.status);
  }

  @Get('table/:tableId')
  findOpenByTable(@Param('tableId') tableId: string) {
    return this.service.findOpenByTable(tableId);
  }

  @Delete('item/:orderItemId')
  removeItem(@Param('orderItemId') orderItemId: string) {
    return this.service.removeItem(orderItemId);
  }

  @Get('reports/sales')
  getSalesReport() {
    return this.service.getSalesReport();
  }

  @Get('kitchen/queue')
  getKitchenQueue() {
    return this.service.getKitchenQueue();
  }

  @Patch(':id/close')
  async closeOrder(@Param('id') id: string) {
    return this.service.closeOrder(id);
  }

  // Adicione isto no seu OrderController
  @Patch('item/:id/ready')
  async markItemAsReady(@Param('id') id: string) {
    return this.service.markItemAsReady(id);
  }

  @Get('reports/sales')
  async getSalesReport() {
    return this.orderService.getSalesReport();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.service.remove(id);
  // }
}
EOF

#########################################
# TABLE (IMPORT CORRIGIDO ❗)
#########################################
cat <<'EOF' > src/table/table.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableService } from './table.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';
import { UpdateTableDto } from './dto/update-table.dto.js';

@Controller('tables')
export class TableController {
  constructor(private readonly service: TableService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTableDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
EOF

#########################################
# ROLES DECORATOR (CAMINHO CORRETO)
#########################################
cat <<'EOF' > src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../generated/prisma/enums.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
EOF

#!/bin/bash
set -e

echo "Corrigindo os 12 erros de módulos não encontrados..."

# --- CATEGORY ---
# Garante que o Module encontre o Service e Controller (removendo .js se houver)
cat <<'EOF' > src/category/category.module.ts
// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryController } from './category.controller.js';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
EOF

# --- ORDER ---
mkdir -p src/order/dto
cat <<'EOF' > src/order/dto/create-order.dto.ts
export class CreateOrderDto {}
EOF

cat <<'EOF' > src/order/dto/update-order.dto.ts
// src/order/dto/update-order.dto.ts
import { IsEnum, IsOptional } from 'class-validator';

enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
EOF

echo "Criando update-status.dto.ts .."
cat <<'EOF' > src/order/dto/update-status.dto.ts
// src/order/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums.js';

export class UpdateStatusDto {
  @IsEnum(OrderStatus, {
    message: 'Status inválido. Use PENDING, PREPARING, READY ou DELIVERED',
  })
  status: OrderStatus;
}
EOF

cat <<'EOF' > src/order/order.module.ts
// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { OrderController } from './order.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
EOF

# --- PRODUCTS ---
cat <<'EOF' > src/products/dto/create-product.dto.ts
// src/products/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsUUID() // Valida se o ID enviado tem formato de UUID
  @IsNotEmpty()
  categoryId: string;
}
EOF

cat <<'EOF' > src/products/dto/update-product.dto.ts
// src/products/dto/update-product.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
EOF

# --- TABLE ---
cat <<'EOF' > src/table/dto/create-table.dto.ts
// src/table/dto/create-table.dto.ts
import { IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum TableStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsEnum(TableStatus)
  @IsOptional()
  status?: TableStatus;
}
EOF

cat <<'EOF' > src/table/table.module.ts
import { Module } from '@nestjs/common';
import { TableService } from './table.service.js';
import { TableController } from './table.controller.js';

@Module({
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
EOF

cat <<'EOF' > src/table/table.service.ts
// src/table/table.service.ts
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTableDto) {
    try {
      return await this.prisma.table.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe uma mesa com este número.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.table.findMany();
  }

  async remove(id: string) {
    // 1. Verificamos se a mesa existe
    const table = await this.prisma.table.findUnique({ where: { id } });
    if (!table) throw new NotFoundException('Mesa não encontrada');

    // 2. Executamos a limpeza total em ordem para não dar erro de chave estrangeira
    return await this.prisma.$transaction(async (tx) => {
      // A. Apaga os itens dos pedidos dessa mesa
      await tx.orderItem.deleteMany({
        where: { order: { tableId: id } }
      });

      // B. Apaga os pedidos dessa mesa
      await tx.order.deleteMany({
        where: { tableId: id }
      });

      // C. Agora sim, apaga a mesa
      return await tx.table.delete({
        where: { id }
      });
    });
  }

  async resetTable(id: string) {
    const table = await this.prisma.table.findUnique({ where: { id } });
    
    if (!table) throw new NotFoundException('Mesa não encontrada');

    return this.prisma.table.update({
      where: { id },
      data: { status: 'FREE' } // Certifique-se que o status no Prisma é 'FREE'
    });
  }
}
EOF

# --- USER ---
cat <<'EOF' > src/user/dto/create-user.dto.ts
export class CreateUserDto {}
EOF

cat <<'EOF' > src/user/dto/update-user.dto.ts
// src/user/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
EOF

cat <<'EOF' > src/table/dto/update-table.dto.ts
// src/table/dto/update-table.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto.js';

export class UpdateTableDto extends PartialType(CreateTableDto) {}
EOF

cat <<'EOF' > src/table/dto/create-table.dto.ts
import { IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum TableStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsEnum(TableStatus)
  @IsOptional()
  status?: TableStatus;
}
EOF

cat <<'EOF' > src/table/table.service.ts
// src/table/table.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTableDto) {
    try {
      return await this.prisma.table.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe uma mesa com este número.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.table.findMany();
  }
}
EOF

cat <<'EOF' > src/table/table.controller.ts
// src/table/table.controller.ts
import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { TableService } from './table.service.js';
import { CreateTableDto } from './dto/create-table.dto.js';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id/reset')
  async resetTable(@Param('id') id: string) {
    // Chamamos o método do SERVICE, não do Prisma direto
    return this.tableService.resetTable(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
EOF

cat <<'EOF' > src/order/dto/create-order.dto.ts
import { IsUUID, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  tableId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
EOF

cat <<'EOF' > src/order/order.service.ts
// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        status: dto.status,
        table: { connect: { id: dto.tableId } },
        user: { connect: { id: dto.userId } },
      },
      include: {
        table: true,
        user: { select: { name: true, email: true } },
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { table: true, user: { select: { name: true } } },
    });
  }
}
EOF

cat <<'EOF' > src/user/dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
  CHEF = 'CHEF'
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
EOF

cat <<'EOF' > src/order/dto/add-item.dto.ts
// src/order/dto/add-item.dto.ts
import { IsString, IsInt, IsUUID, IsOptional, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional() // O garçom nem sempre vai escrever algo
  observation?: string; // 👈 Adicione esta linha!
}
EOF

cat <<'EOF' > .gitignore
# Dependências
node_modules/

# Build do NestJS
dist/

# Variáveis de ambiente (IMPORTANTE)
.env
.env.test
.env.production

# Logs
*.log
npm-debug.log*

# Prisma (SQLite local se usar)
/prisma/*.db
/prisma/*.db-journal

# IDEs
.vscode/
.idea/
.DS_Store

/generated/prisma
EOF

echo "Arquivos recriados e caminhos corrigidos!"



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



#!/bin/bash

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

# Remover arquivos padrão que não serão usados
echo "🧹 Limpando arquivos padrão..."
rm src/app.service.ts
rm src/app.controller.ts

# Sobrescreve o app.module.ts para remover as referências aos arquivos deletados
cat <<EOF > src/app.module.ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module.js';
import { UserModule } from './user/user.module.js';
import { PostModule } from './post/post.module.js';
import { AdminModule } from './admin/admin.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductsModule,
    AuthModule,
    UserModule, 
    PostModule, 
    AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
EOF

echo "📁 Gerando Recursos (Resources)..."
# Agora o 'nest g res' não vai falhar no npm install interno
npx nest g res products --no-spec --no-flat
npx nest g res user --no-spec --no-flat
npx nest g res post --no-spec --no-flat
npx nest g res admin --no-spec --no-flat

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

echo "🔥 1️⃣ PrismaModule (centralizado)"
## 📁 `src/prisma/prisma.module.ts`
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
  name        String
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
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id])
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  quantity    Int
  unitPrice   Decimal @db.Decimal(10, 2)
  observation String? // Ex: "Sem gelo", "Bem passado"
}

enum OrderStatus {
  PENDING
  PREPARING
  READY
  DELIVERED
  CANCELED
}
EOF


####################################
echo "📦 Gerando Prisma Client..."
####################################
npx prisma generate

####################################
echo "📦 Criando src/user/user.service.ts  "
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

echo criando src/user/user.controller.js
// src/user/user.controller.js
cat > src/user/user.controller.js <<EOF
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

####################################
echo "🔧 Criando src/post/post.service.ts"
####################################
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

echo "Criando // src/post/post.controller.ts"
cat < src/post/post.controller.ts <<EOF
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

echo "Criando src/post/dto/create-post.dto.ts"
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

echo "Criando src/post/dto/update-post.dto.ts"
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
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Product, Prisma } from '../generated/prisma/client.js'; 

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: { name: string; price: string; description?: string; categoryId: string }) {
    return this.prisma.product.create({
      data: {
        ...data,
        price: new Prisma.Decimal(data.price),
      },
    });
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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body()
    data: {
      name: string;
      price: string;
      description?: string;
      categoryId: string; // 👈 ADICIONA ISSO
    },
  ) {
    return this.productsService.createProduct(data);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
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

    return { access_token: this.jwtService.sign(payload) };
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



#!/bin/bash

PROJECT_NAME="api"

echo "🚀 Criando projeto NestJS..."
nest new $PROJECT_NAME --package-manager npm --skip-git --skip-install

cd $PROJECT_NAME

# https://www.prisma.io/docs/guides/frameworks/nestjs#26-create-and-run-your-migration
# https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

echo "📦 Instalando dependências..."
npm install
npm install prisma --save-dev
npm install @prisma/client pg
npm install class-validator class-transformer
npm install @nestjs/config

npm install helmet 
npm install @nestjs/helmet
npm install @nestjs/platform-express
npm install @prisma/adapter-pg

npm install -D typescript tsx @types/node @prisma/adapter-pg pg @types/pg dotenv

# 1. Instala o bcrypt e tipos para segurança
npm install bcrypt
npm install -D @types/bcrypt ts-node

###########################################
# Comandos essenciais iniciar o Prisma e criar a estrutura básica do projeto
###########################################
# npm install helmet
# npx prisma migrate reset
# npx prisma migrate dev --name init
# npx prisma db seed -- --environment development
# npx prisma studio

###########################################
# Para acessar a documentação Swagger, mas pode ser removido se não for necessário
# npm install swagger-ui-express @nestjs/swagger
# localhost:3000/api-docs
###########################################
npm install @nestjs/swagger

npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install @types/passport-jwt @types/bcrypt --save-dev

npm install @nestjs/throttler

echo "⚙️ Inicializando Prisma..."
npx prisma init

echo "📁 Criando estrutura básica..."
nest g module user
nest g service user --no-spec
nest g controller user --no-spec

###########################################
echo "🛠️ Customizando os arquivos do projeto..."
###########################################

# 1. Sobrescrevendo o UserService (com o método findAll)
cat > src/user/user.service.ts << EOF
// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: any[] = []; // Simulando um banco de dados temporário

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

EOF

# 2. Sobrescrevendo o UserModule (para garantir o export do UserService)
cat > src/user/user.module.ts << EOF
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
EOF

# 3. Sobrescrevendo o AppService (Injetando o UserService)
cat > src/app.service.ts << EOF
import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    const users = this.userService.findAll();
    console.log('Usuários encontrados:', users);
    return 'Dados do usuário recuperados!';
  }
}
EOF

# 4. Sobrescrevendo o AppModule (Importando o UserModule)
cat > src/app.module.ts << EOF
# src/app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service.js";
import { PrismaService } from "./prisma.service.js"; 
import { UserService } from "./user.service.js"; 
import { PostService } from "./post.service.js"; 

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, PostService], 
})
export class AppModule {}
EOF


###########################################
echo "📝 Sobrescrevendo o nest-cli.json"
###########################################
cat > nest-cli.json << EOF
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": true,
          "introspectComments": true
        }
      }
    ]
  }
}
EOF

###########################################
echo "📝 Sobrescrevendo o main"
###########################################
cat > src/main.ts << EOF
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
// 1. Importe os módulos do Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Segurança de Cabeçalhos HTTP
  app.use(helmet());

  // 2. Habilita CORS
  app.enableCors();

  // 3. Validação Global de Dados
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API Administrativa')
    .setDescription('Documentação técnica do sistema')
    .setVersion('1.0')
    .addTag('users')
    // Se for usar JWT depois, o Swagger já fica pronto para aceitar o token
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Caminho customizado que você pediu: /admin-docs
  SwaggerModule.setup('admin-docs', app, document);
  // -------------------------------

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
  console.log(`📖 Documentação em: http://localhost:${port}/admin-docs`);
}
bootstrap();
EOF


###########################################
echo "📝 Criando .dockerignore"
###########################################
cat > .dockerignore << EOF
node_modules
dist
.git
.env
EOF

echo "✅ Projeto configurado com sucesso!"

###########################################
echo "🐳 Criando Dockerfile"
###########################################

cat > Dockerfile << EOF
# Estágio de Build
FROM node:latest AS builder
WORKDIR /app

# 1. Instala dependências
COPY package*.json ./
RUN npm install

# 2. Copia o código e gera o Prisma Client
COPY . .
RUN npx prisma generate

# 3. Faz o build da aplicação NestJS
RUN npm run build

# 4. Remove dependências de desenvolvimento para diminuir a imagem
RUN npm prune --production

# 1. Gerar o cliente no local customizado
# npx prisma generate

# 2. Rodar as migrações (cria as tabelas no Postgres)
# npx prisma migrate dev --name init

# 3. Executar o seed (o Prisma lerá o comando do package.json que configuramos)
# npx prisma db seed

# Estágio de Execução (Final)
FROM node:latest
WORKDIR /app

# Copia apenas o necessário do estágio builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma 

EXPOSE 3000

# Executa as migrações no banco real e inicia o servidor
CMD npx prisma migrate deploy && npx prisma db seed && node dist/main
EOF

###########################################
echo "🐳 Criando docker-compose.yml"
###########################################

cat > docker-compose.yml << EOF
services:
  api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules # Mantém node_modules isolados do host
      - /app/dist # Impede que o volume local sobrescreva ou dist gerado  
EOF

###########################################
# Criar seed para criar um usuário admin
###########################################
# Criar o arquivo de seed
cat > prisma/seed.ts << EOF
// seed.ts
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js"; 
import * as bcrypt from "bcrypt";

// 1. Corrigido: Garantindo que a string de conexão não esteja vazia
const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });

// 2. Corrigido: Cast duplo para resolver o conflito de tipos do PG
const adapter = new PrismaPg(pool as unknown as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seeding...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log('✅ Usuário admin verificado/criado:', admin.email);
}

main()
  .then(async () => {
    // 3. Corrigido: Adicionado os nomes dos métodos $disconnect
    await prisma.$disconnect();
    await pool.end();
    console.log('🏁 Processo de seed finalizado.');
  })
  .catch(async (e) => {
    console.error('❌ Erro durante o seed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
EOF

###########################################
echo "🛠️ Configurando seed do Prisma"
###########################################
# Adiciona a configuração do prisma seed no package.json
# Usando uma técnica simples de substituição se não tiver jq instalado:
sed -i '/"dependencies": {/i \  "prisma": {\n    "seed": "ts-node prisma/seed.ts"\n  },' package.json

# Instala o ts-node (necessário para rodar o seed .ts)
npm install -D ts-node

###########################################
echo "🌱 Criando .env"
###########################################

cat > .env << EOF
DATABASE_URL="postgresql://postgres:postgres@localhost:5431/nestdb?schema=public"
EOF

###########################################
echo "📝 Criando PrismaService"
###########################################
# Cria a pasta de prisma caso ela não exista
mkdir -p src/prisma

cat > src/prisma/prisma.service.ts << EOF
// src/prisma/prisma.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client.js"; // Importando o PrismaClient gerado
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

###########################################
echo "📝 Criando PrismaModule"
###########################################

cat > src/prisma/prisma.module.ts << EOF
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
EOF

###########################################
echo "📝 Criando CreateUserDto"
###########################################
# Cria a pasta de DTOs caso ela não exista
mkdir -p src/user/dto

# Cria o arquivo DTO's para validação de dados de criação de usuário
cat > src/user/dto/create-user.dto.ts << EOF
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail único' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Mínimo de 6 caracteres' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
EOF

###########################################
echo "📝 Atualizando UserController"
###########################################

cat > src/user/user.controller.ts << EOF
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
EOF

###########################################
echo "📝 Atualizando prisma.config.ts"
###########################################
cat > prisma.config.ts << EOF
// This file was generated by Prisma, and assumes you have installed the following:
// npm install --save-dev prisma dotenv
// npm install -D tsx
// npx prisma db seed
// prisma.config.ts (na raiz do projeto)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Este comando será chamado quando você rodar 'npx prisma db seed'
    seed: "tsx prisma/seed.ts", 
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
EOF

###########################################
echo "📝 Atualizando UserService"
###########################################

cat > src/user/user.service.ts << EOF
// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: any[] = []; // Simulando um banco de dados temporário

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
EOF

###########################################
echo "📝 Criando testes.http "
###########################################
cat > testes.http << EOF
### Criar um novo usuário
POST http://localhost:3000/users
Content-Type: application/json
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "senha123"
}

### Listar todos os usuários
GET http://localhost:3000/users

### Obter um usuário específico
GET http://localhost:3000/users/1

### Atualizar um usuário
PATCH http://localhost:3000/users/1
Content-Type: application/json
{
  "name": "João Silva Atualizado"
}

### Testar Erro de Validação (Senha curta)
POST http://localhost:3000/users
Content-Type: application/json
{
  "name": "Erro",
  "email": "email-invalido",
  "password": "123"
}

### Deletar um usuário
DELETE http://localhost:3000/users/1
EOF

###########################################
echo "📝 Criando schema.prisma"
###########################################

cat > prisma/schema.prisma << EOF
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
  previewFeatures = ["driverAdapters"]
}
datasource db {
  provider = "postgresql"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
  password  String
  role      String   @default("USER") // Adicionei um valor padrão por segurança
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
EOF

###########################################
echo "📝 Criando user.service.ts"
###########################################
cat > src/user.service.ts << EOF
# src/user.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { User, Prisma } from "./generated/prisma/client.js";

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
    return this.prisma.user.create({
      data,
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



###########################################
echo "📝 Criando post.service.ts"
###########################################
cat > src/post.service.ts << EOF
# src/post.service.ts
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

###########################################
# Sobrescrevendo o AppController)
###########################################
cat > src/app.controller.ts << EOF
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
  async signupUser(@Body() userData: { name?: string; email: string }): Promise<UserModel> {
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

echo "✅ Projeto $PROJECT_NAME criado com sucesso!"
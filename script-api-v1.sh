#!/bin/bash

# Define o nome do projeto em uma variável para fácil alteração
PROJECT_NAME="minha-api-v1"

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

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
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

#########################################
# Criar .env
#########################################
cat > .env <<EOF
# Exemplo para o seu Docker Compose local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb?schema=public"

EOF

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
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
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

####################################
# Replace AppController
####################################
cat > src/app.controller.ts <<EOF
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

####################################
# Replace main.ts
####################################
cat > src/main.ts <<EOF
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
EOF

####################################
# Replace package.json
####################################
npm pkg set type="module"
# cat > package.json <<EOF
# {
#   "name": "minha-api",
#   "version": "0.0.1",
#   "type": "module",
#   "description": "",
#   "author": "",
#   "private": true,
#   "license": "UNLICENSED",
#   "scripts": {
#     "build": "nest build",
#     "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
#     "start": "nest start",
#     "start:dev": "nest start --watch",
#     "start:debug": "nest start --debug --watch",
#     "start:prod": "node dist/main",
#     "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
#     "test": "jest",
#     "test:watch": "jest --watch",
#     "test:cov": "jest --coverage",
#     "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
#     "test:e2e": "jest --config ./test/jest-e2e.json"
#   },
#   "dependencies": {
#     "@nestjs/common": "^11.0.1",
#     "@nestjs/config": "^4.0.3",
#     "@nestjs/core": "^11.0.1",
#     "@nestjs/platform-express": "^11.0.1",
#     "@prisma/adapter-pg": "^7.5.0",
#     "@prisma/client": "^7.5.0",
#     "pg": "^8.20.0",
#     "reflect-metadata": "^0.2.2",
#     "rxjs": "^7.8.1"
#   },
#   "devDependencies": {
#     "@eslint/eslintrc": "^3.2.0",
#     "@eslint/js": "^9.18.0",
#     "@nestjs/cli": "^11.0.0",
#     "@nestjs/schematics": "^11.0.0",
#     "@nestjs/testing": "^11.0.1",
#     "@types/express": "^5.0.0",
#     "@types/jest": "^30.0.0",
#     "@types/node": "^22.10.7",
#     "@types/supertest": "^6.0.2",
#     "eslint": "^9.18.0",
#     "eslint-config-prettier": "^10.0.1",
#     "eslint-plugin-prettier": "^5.2.2",
#     "globals": "^16.0.0",
#     "jest": "^30.0.0",
#     "prettier": "^3.4.2",
#     "prisma": "^7.5.0",
#     "source-map-support": "^0.5.21",
#     "supertest": "^7.0.0",
#     "ts-jest": "^29.2.5",
#     "ts-loader": "^9.5.2",
#     "ts-node": "^10.9.2",
#     "tsconfig-paths": "^4.2.0",
#     "typescript": "^5.7.3",
#     "typescript-eslint": "^8.20.0"
#   },
#   "jest": {
#     "moduleFileExtensions": [
#       "js",
#       "json",
#       "ts"
#     ],
#     "rootDir": "src",
#     "testRegex": ".*\\.spec\\.ts$",
#     "transform": {
#       "^.+\\.(t|j)s$": "ts-jest"
#     },
#     "collectCoverageFrom": [
#       "**/*.(t|j)s"
#     ],
#     "coverageDirectory": "../coverage",
#     "testEnvironment": "node"
#   }
# }
# EOF

# tree prisma
# prisma
# ├── dev.db
# ├── migrations
# │   └── 20201207100915_init
# │       └── migration.sql
# └── schema.prisma

# npx prisma migrate dev --name init

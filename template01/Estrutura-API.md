Ótima escolha de stack: **NestJS + Prisma + Docker** é uma base moderna e bem organizada para APIs. Vou te mostrar um **setup inicial focado no módulo `user`**, já com **Dockerfile, docker-compose e Prisma**.

---

# 1️⃣ Criar o projeto NestJS

```bash
npm i -g @nestjs/cli
nest new api
cd api
```

Instalar dependências:

```bash
npm install prisma @prisma/client
npm install class-validator class-transformer
npm install @nestjs/config
```

Dev:

```bash
npm install -D prisma
```

---

# 2️⃣ Inicializar Prisma

```bash
npx prisma init
```

Vai criar:

```
prisma/
  schema.prisma
.env
```

---

# 3️⃣ Configurar banco no Prisma

Exemplo usando **PostgreSQL**.

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

# 4️⃣ Variáveis de ambiente

`.env`

```
DATABASE_URL="postgresql://postgres:postgres@db:5432/nestdb?schema=public"
```

Note que o host será **`db`**, porque vamos usar docker-compose.

---

# 5️⃣ Criar módulo User

No **NestJS**:

```bash
nest g module user
nest g service user
nest g controller user
```

Estrutura:

```
src/user
  user.controller.ts
  user.service.ts
  user.module.ts
```

---

# 6️⃣ Criar PrismaService

Crie:

```
src/prisma/prisma.service.ts
```

```ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {

  async onModuleInit() {
    await this.$connect()
  }
}
```

Crie também:

```
src/prisma/prisma.module.ts
```

```ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

# 7️⃣ User Service

`user.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }
}
```

---

# 8️⃣ User Controller

`user.controller.ts`

```ts
import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    return this.userService.create(body)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }
}
```

---

# 9️⃣ Dockerfile

Na raiz:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

---

# 🔟 docker-compose

`docker-compose.yml`

```yaml
version: "3.9"

services:

  api:
    build: .
    container_name: nest_api
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/nestdb?schema=public

  db:
    image: postgres:15
    container_name: nest_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: nestdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

# 1️⃣1️⃣ Rodar migrations

Primeiro subir containers:

```bash
docker compose up -d
```

Rodar migration:

```bash
npx prisma migrate dev --name init
```

---

# 1️⃣2️⃣ Testar API

Criar user:

```
POST http://localhost:3000/users
```

Body:

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

Listar:

```
GET /users
```

---

# 🚀 Estrutura final recomendada

```
src
 ├ prisma
 │  ├ prisma.module.ts
 │  └ prisma.service.ts
 ├ user
 │  ├ user.controller.ts
 │  ├ user.service.ts
 │  └ user.module.ts
 └ main.ts

prisma
 └ schema.prisma

Dockerfile
docker-compose.yml
```

---

💡 Se quiser, posso também te mostrar uma **arquitetura profissional para NestJS** com:

* **DDD / Clean Architecture**
* **DTO + Validation**
* **Auth com JWT**
* **hash de senha com bcrypt**
* **refresh token**
* **Prisma repository pattern**

que é praticamente **o padrão usado em empresas grandes**.

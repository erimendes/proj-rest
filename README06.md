Abaixo está um **template inicial completo** para começar seu sistema de restaurante (POS + garçom + cozinha) usando containers. Ele já inclui:

* **docker-compose pronto**
* Backend com **NestJS**
* Banco **PostgreSQL** com migrations via **Prisma**
* Frontend com **Next.js**
* WebSocket para cozinha com **Socket.IO**
* Autenticação **JWT**
* Modelo inicial de banco (users, tables, products, orders)

---

# 1️⃣ Estrutura do projeto

```
restaurant-template
│
├ docker-compose.yml
│
├ backend
│ ├ Dockerfile
│ ├ package.json
│ ├ prisma
│ │ └ schema.prisma
│ └ src
│   ├ main.ts
│   ├ app.module.ts
│   ├ auth
│   ├ orders
│   ├ tables
│   └ websocket
│
└ frontend
  ├ Dockerfile
  ├ package.json
  └ app
    └ page.tsx
```

---

# 2️⃣ docker-compose.yml

```yaml
version: "3.9"

services:

  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: restaurant
      POSTGRES_PASSWORD: restaurant
      POSTGRES_DB: restaurant
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3001:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://restaurant:restaurant@postgres:5432/restaurant
      JWT_SECRET: supersecret

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

# 3️⃣ Dockerfile backend

`backend/Dockerfile`

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:prod"]
```

---

# 4️⃣ Backend package.json

`backend/package.json`

```json
{
 "name": "restaurant-api",
 "scripts": {
  "build": "nest build",
  "start": "node dist/main.js",
  "start:dev": "nest start --watch"
 },
 "dependencies": {
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/jwt": "^10.0.0",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/websockets": "^10.0.0",
  "passport-jwt": "^4.0.1",
  "bcrypt": "^5.1.0",
  "socket.io": "^4.7.0",
  "@prisma/client": "^5.0.0"
 },
 "devDependencies": {
  "prisma": "^5.0.0",
  "@nestjs/cli": "^10.0.0"
 }
}
```

---

# 5️⃣ Prisma schema (modelo inicial)

`backend/prisma/schema.prisma`

```prisma
datasource db {
 provider = "postgresql"
 url      = env("DATABASE_URL")
}

generator client {
 provider = "prisma-client-js"
}

model User {
 id        String   @id @default(uuid())
 name      String
 email     String   @unique
 password  String
 role      String
 createdAt DateTime @default(now())
}

model Table {
 id     String @id @default(uuid())
 number Int
 status String
}

model Product {
 id    String @id @default(uuid())
 name  String
 price Float
}

model Order {
 id        String   @id @default(uuid())
 tableId   String
 status    String
 createdAt DateTime @default(now())

 items OrderItem[]
}

model OrderItem {
 id        String @id @default(uuid())
 orderId   String
 productId String
 quantity  Int
}
```

Rodar migration:

```
npx prisma migrate dev
```

---

# 6️⃣ WebSocket da cozinha

`backend/src/websocket/kitchen.gateway.ts`

```ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
 cors: { origin: "*" }
})
export class KitchenGateway {

 @WebSocketServer()
 server: Server

 sendNewOrder(order: any) {
  this.server.emit("kitchen:new-order", order)
 }

}
```

---

# 7️⃣ Serviço de pedidos

`backend/src/orders/orders.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { KitchenGateway } from '../websocket/kitchen.gateway'

const prisma = new PrismaClient()

@Injectable()
export class OrdersService {

 constructor(private kitchen: KitchenGateway) {}

 async create(data:any){

  const order = await prisma.order.create({
   data:{
    tableId:data.tableId,
    status:"OPEN"
   }
  })

  this.kitchen.sendNewOrder(order)

  return order
 }

}
```

---

# 8️⃣ Autenticação JWT

`auth.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

 constructor(private jwt:JwtService){}

 async login(user:any){

  const payload = {sub:user.id}

  return {
   access_token:this.jwt.sign(payload)
  }

 }

}
```

---

# 9️⃣ Frontend Next.js simples

`frontend/app/page.tsx`

```tsx
"use client"

import { useEffect, useState } from "react"

export default function Home(){

 const [tables,setTables] = useState([])

 useEffect(()=>{

  fetch("http://localhost:3001/tables")
  .then(res=>res.json())
  .then(setTables)

 },[])

 return (

  <div>

   <h1>Mesas</h1>

   {tables.map((t:any)=>(
    <div key={t.id}>
     Mesa {t.number}
    </div>
   ))}

  </div>

 )

}
```

---

# 🔟 Rodar tudo

Na raiz do projeto:

```
docker compose build --no-cache
docker compose up -d postgres
docker compose up --build
```

Depois acessar:

```
http://localhost:3000 → app
http://localhost:3001 → API
```

---

# 🚀 Próximos upgrades recomendados

Para evoluir esse template para **nível produção**, adicione:

* cache com **Redis**
* filas com **RabbitMQ**
* gateway com **NGINX**
* monitoramento com **Prometheus**

---

✅ Se quiser, no próximo passo posso montar algo **ainda mais avançado para você**:

* **repositório completo pronto (estrutura de 10k+ linhas)**
* **banco de dados com 60+ tabelas reais de POS**
* **app do garçom pronto**
* **tela de cozinha estilo McDonald's**
* **sistema de QR code funcional**

Isso basicamente vira **um SaaS completo para vender para restaurantes**.

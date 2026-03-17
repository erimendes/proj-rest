1️⃣ Funcionalidades principais
🪑 Mesas

Criar mesas

Abrir mesa

Ver mesas ocupadas/livres

Fechar mesa

Dividir conta

🍔 Cardápio

Categorias (bebidas, lanches, pratos)

Produtos

Preço

Observações (ex: sem cebola)

🧾 Pedidos

Garçom seleciona mesa

Adiciona produtos

Envia pedido

Cozinha recebe em tempo real

👨‍🍳 Cozinha

Ver pedidos novos

Marcar como:

Em preparo

Pronto

Entregue

💰 Conta

Total da mesa

Pagamento

Fechamento

2️⃣ Arquitetura recomendada

Uma stack simples e moderna:

Frontend (App do garçom)

Pode ser:

React

Next.js

ou Flutter se quiser app mobile

Para começar rápido:

👉 Next.js (web app)

Garçons podem usar no celular pelo navegador.

Backend (API)

Opções muito usadas:

Node.js

NestJS

Express.js

Eu recomendo:

👉 NestJS
porque já vem estruturado.

Banco de dados

Boas opções:

PostgreSQL

MySQL

Mais comum hoje:

👉 PostgreSQL

3️⃣ Estrutura do banco de dados
Tabela mesas
mesas
- id
- numero
- status (livre, ocupada)
- criada_em
Tabela produtos
produtos
- id
- nome
- preco
- categoria_id
- ativo
Tabela categorias
categorias
- id
- nome
Tabela pedidos
pedidos
- id
- mesa_id
- garcom_id
- status
- criado_em

status:

aberto
enviado
preparando
pronto
entregue
fechado
Itens do pedido
pedido_itens
- id
- pedido_id
- produto_id
- quantidade
- observacao
4️⃣ API (exemplo de endpoints)
Mesas
GET /mesas
POST /mesas/abrir
POST /mesas/fechar
Produtos
GET /produtos
GET /categorias
Pedidos

Criar pedido

POST /pedidos

Adicionar item

POST /pedidos/:id/item

Enviar para cozinha

POST /pedidos/:id/enviar
5️⃣ Tempo real para cozinha

Para pedidos aparecerem instantaneamente:

Use WebSocket

bibliotecas:

Socket.IO

WebSocket

Fluxo:

Garçom envia pedido

API salva

WebSocket envia para tela da cozinha

Cozinha vê na hora

6️⃣ Telas do sistema
Garçom

1️⃣ Login
2️⃣ Lista de mesas
3️⃣ Abrir mesa
4️⃣ Adicionar produtos
5️⃣ Enviar pedido

Cozinha

Tela simples:

Mesa 5
2x X-Burger
1x Batata
Obs: sem cebola

Botões:

[Preparando]
[Pronto]
Caixa

Ver mesa

Total

Fechar conta

7️⃣ Estrutura do projeto

Backend

api/
 controllers/
 services/
 modules/
 database/
 auth/

Frontend

app/
 components/
 pages/
 services/
 hooks/
8️⃣ Recursos extras (vale MUITO a pena)

⭐ QR Code na mesa
⭐ Imprimir pedido
⭐ Histórico
⭐ Relatórios
⭐ Integração com impressora térmica

9️⃣ Tempo para desenvolver

Se fizer sozinho:

MVP simples:

⏱ 2 a 4 semanas

Sistema completo:

⏱ 1 a 2 meses

A stack que vou usar como referência:

Frontend: Next.js

Backend: NestJS

Banco: PostgreSQL

ORM: Prisma

Tempo real: Socket.IO

Container: Docker

Isso é arquitetura usada em SaaS modernos.

🧠 1️⃣ Arquitetura profissional (estilo iFood interno)

Estrutura geral:

APP GARÇOM
     │
     │ HTTP / WebSocket
     ▼
API (Backend)
     │
     ├── Auth
     ├── Mesas
     ├── Pedidos
     ├── Produtos
     ├── Pagamentos
     │
     ▼
Banco de dados
(PostgreSQL)

     │
     ▼
Tela da cozinha (tempo real)

Fluxo de pedido:

Garçom cria pedido
      │
      ▼
API salva pedido
      │
      ▼
WebSocket envia para cozinha
      │
      ▼
Cozinha muda status
      │
      ▼
Garçom vê atualização
🗂️ 2️⃣ Estrutura profissional de pastas

Backend:

restaurant-api
 ├ src
 │
 ├ modules
 │   ├ auth
 │   ├ users
 │   ├ tables
 │   ├ products
 │   ├ orders
 │   ├ kitchen
 │   └ payments
 │
 ├ database
 │   ├ prisma
 │   └ migrations
 │
 ├ websocket
 │
 ├ common
 │   ├ guards
 │   ├ filters
 │   └ interceptors
 │
 └ main.ts

Frontend:

restaurant-app

src
 ├ app
 ├ components
 ├ services
 ├ hooks
 ├ store
 └ pages
🗃️ 3️⃣ Modelo COMPLETO do banco de dados
users
users
- id
- name
- email
- password
- role
- created_at

roles:

admin
garcom
cozinha
caixa
tables
tables
- id
- number
- status
- opened_at

status:

free
occupied
reserved
categories
categories
- id
- name
- created_at
products
products
- id
- name
- price
- category_id
- active
orders
orders
- id
- table_id
- waiter_id
- status
- created_at

status:

open
sent_to_kitchen
preparing
ready
delivered
closed
order_items
order_items
- id
- order_id
- product_id
- quantity
- notes
payments
payments
- id
- order_id
- amount
- method
- paid_at

method:

cash
credit
debit
pix
🎨 4️⃣ Design das telas do app do garçom

Fluxo simples.

Tela 1 — Login
+----------------+
|   RESTAURANTE  |
|                |
| Email          |
| [__________]   |
| Senha          |
| [__________]   |
|                |
|   Entrar       |
+----------------+
Tela 2 — Mesas
MESAS

[1] Livre
[2] Ocupada
[3] Livre
[4] Ocupada
[5] Livre

Cores:

🟢 livre
🔴 ocupada

Tela 3 — Mesa aberta
Mesa 4

Pedidos

2x Coca
1x Burger

Total: R$45

[Adicionar Item]
[Enviar para cozinha]
[Fechar mesa]
Tela 4 — Cardápio
Categorias

Bebidas
Lanches
Pratos

Itens

Coca-Cola
R$8

Burger
R$25
Tela 5 — Observação
Burger

Quantidade
[-] 1 [+]

Observação

[sem cebola]

[Adicionar]
🔌 5️⃣ Endpoints da API
login
POST /auth/login
mesas
GET /tables
POST /tables/open
POST /tables/close
produtos
GET /products
GET /categories
pedidos

Criar pedido

POST /orders

Adicionar item

POST /orders/:id/items

Enviar para cozinha

POST /orders/:id/send
cozinha

Pedidos da cozinha

GET /kitchen/orders

Atualizar status

PATCH /orders/:id/status
⚡ 6️⃣ Tempo real com WebSocket

Quando um pedido é enviado:

Garçom → API
API → salva pedido
API → envia evento websocket
Cozinha → recebe pedido

Evento:

order:new
🧱 7️⃣ PASSO A PASSO para criar o projeto

Agora vem o guia real.

PASSO 1 — Criar backend

Instalar:

npm install -g @nestjs/cli

Criar projeto:

nest new restaurant-api
PASSO 2 — Instalar banco

Instalar:

npm install prisma @prisma/client

Iniciar prisma

npx prisma init
PASSO 3 — Criar schema do banco

prisma/schema.prisma

Exemplo:

model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
  role     String
}
PASSO 4 — Rodar migration
npx prisma migrate dev
PASSO 5 — Criar módulo de pedidos
nest generate module orders
nest generate controller orders
nest generate service orders
PASSO 6 — Criar endpoint
POST /orders

exemplo:

@Post()
createOrder() {
 return this.ordersService.create()
}
PASSO 7 — Criar frontend

Criar projeto:

npx create-next-app restaurant-app

Instalar:

npm install axios
PASSO 8 — Criar serviço API
src/services/api.ts
import axios from "axios"

export const api = axios.create({
 baseURL: "http://localhost:3000"
})
PASSO 9 — Buscar mesas
GET /tables

Exemplo:

api.get("/tables")
PASSO 10 — Deploy

Backend:

Railway

Render

Frontend:

Vercel

🚀 Estrutura final

Sistema terá:

Garçom app
Cozinha screen
Caixa
API
Banco
WebSocket

💡 Se quiser, no próximo passo eu posso te mostrar também:

1️⃣ O banco de dados PROFISSIONAL completo (40+ tabelas usado em POS)
2️⃣ Arquitetura usada por iFood e Uber Eats (microserviços)
3️⃣ Código backend completo inicial (500+ linhas)
4️⃣ Interface do app pronta para garçom
5️⃣ Sistema de QR Code para mesa pedir sozinho




Perfeito. Vou transformar isso em um mini-curso passo a passo para você construir um sistema profissional de restaurante (POS + app de garçom + QR Code). 🍔📱

Estrutura do guia:

1️⃣ Arquitetura usada por plataformas tipo iFood (microserviços)
2️⃣ Banco de dados profissional (40+ tabelas)
3️⃣ Código inicial do backend completo
4️⃣ Interface do app do garçom
5️⃣ Sistema de QR Code para clientes pedirem
6️⃣ Plano de desenvolvimento passo a passo

Tecnologias principais:

NestJS (API)

PostgreSQL (banco)

Prisma (ORM)

Next.js (frontend)

Socket.IO (tempo real)

Docker (infraestrutura)

1️⃣ Arquitetura profissional tipo iFood (microserviços)

Grandes apps como iFood e Uber usam microserviços.

Estrutura:

API GATEWAY
     │
     ├── Auth Service
     ├── Restaurant Service
     ├── Orders Service
     ├── Payments Service
     ├── Kitchen Service
     └── Notification Service

Fluxo de pedido:

Cliente / Garçom
      │
API Gateway
      │
Orders Service
      │
Database
      │
Event Bus
      │
Kitchen Service
      │
Tela da cozinha

Comunicação:

HTTP

filas de mensagens

eventos

Ferramentas comuns:

Apache Kafka

RabbitMQ

Redis

Para um restaurante pequeno, monólito modular já é suficiente.

2️⃣ Banco de dados PROFISSIONAL (POS)

Aqui está um modelo parecido com sistemas comerciais.

Usuários
users
roles
permissions
role_permissions
sessions
Restaurante
restaurants
restaurant_settings
restaurant_hours
restaurant_addresses
restaurant_taxes
Funcionários
employees
employee_roles
employee_shifts
employee_permissions
Mesas
tables
table_sections
table_reservations
table_status_history
Cardápio
categories
products
product_images
product_variants
product_options
product_option_values
product_prices
Pedidos
orders
order_items
order_item_options
order_status_history
order_notes
order_discounts
Pagamentos
payments
payment_methods
payment_transactions
payment_refunds
Estoque
inventory_items
inventory_movements
inventory_suppliers
inventory_purchases
inventory_purchase_items
Relatórios
sales_reports
daily_reports
cash_registers
cash_movements

Total aproximado:

40–50 tabelas.

3️⃣ Código inicial backend (estrutura real)

Projeto com NestJS.

Estrutura:

src
 ├ modules
 │   ├ auth
 │   ├ users
 │   ├ tables
 │   ├ products
 │   ├ orders
 │   ├ payments
 │   └ kitchen
 │
 ├ database
 │   └ prisma
 │
 ├ websocket
 │
 └ main.ts
main.ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
 const app = await NestFactory.create(AppModule)

 app.enableCors()

 await app.listen(3000)
}

bootstrap()
orders.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {

 constructor(private ordersService: OrdersService) {}

 @Post()
 createOrder(@Body() data) {
   return this.ordersService.createOrder(data)
 }

 @Get(':id')
 getOrder(@Param('id') id: string) {
   return this.ordersService.getOrder(id)
 }

}
orders.service.ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrdersService {

 async createOrder(data) {

   const order = {
     id: Date.now(),
     table_id: data.table_id,
     items: data.items,
     status: "open"
   }

   return order
 }

 async getOrder(id: string) {
   return { id }
 }

}
websocket gateway (cozinha)
import {
 WebSocketGateway,
 WebSocketServer
} from '@nestjs/websockets'

import { Server } from 'socket.io'

@WebSocketGateway()
export class KitchenGateway {

 @WebSocketServer()
 server: Server

 sendNewOrder(order) {
   this.server.emit("order:new", order)
 }

}
4️⃣ Interface do APP do garçom

Feito com Next.js.

Fluxo:

Login
 ↓
Mesas
 ↓
Abrir mesa
 ↓
Adicionar pedido
 ↓
Enviar cozinha
Tela mesas
+-------------------+
|     MESAS         |
+-------------------+

[ 1 ] 🟢 Livre
[ 2 ] 🔴 Ocupada
[ 3 ] 🟢 Livre
[ 4 ] 🔴 Ocupada
[ 5 ] 🟢 Livre
Tela pedido
Mesa 4

Pedidos
2x Burger
1x Coca

Total R$45

[Adicionar item]
[Enviar cozinha]
[Fechar conta]
Tela cardápio
Categorias

🍔 Lanches
🥤 Bebidas
🍟 Porções

Itens

Burger
R$25

Batata
R$18
5️⃣ Sistema de QR Code para mesa pedir sozinho

Cada mesa terá um QR Code.

Exemplo:

https://app.com/m/mesa/12

Cliente escaneia.

Fluxo:

Cliente escaneia QR
      │
Abre cardápio
      │
Seleciona itens
      │
Cria pedido
      │
Cozinha recebe
Gerar QR code

Biblioteca:

qrcode

exemplo:

import QRCode from "qrcode"

QRCode.toFile("mesa12.png", "https://app.com/m/mesa/12")

Tela do cliente:

Cardápio

Burger
R$25

Batata
R$18

[Adicionar]

Carrinho
Total R$43

[Enviar pedido]
6️⃣ Roadmap completo (PASSO A PASSO)
Semana 1

Infraestrutura

1️⃣ Criar API
2️⃣ Configurar banco
3️⃣ Criar tabelas

Semana 2

Backend

4️⃣ CRUD produtos
5️⃣ CRUD mesas
6️⃣ CRUD pedidos

Semana 3

Tempo real

7️⃣ WebSocket
8️⃣ Tela da cozinha

Semana 4

Frontend

9️⃣ App do garçom
10️⃣ Sistema QR code

Resultado final:

Garçom App
Cliente QR
Tela Cozinha
API
Banco
Relatórios


Perfeito. Vou transformar isso em um **mini-curso passo a passo para você construir um sistema profissional de restaurante (POS + app de garçom + QR Code)**. 🍔📱

Estrutura do guia:

1️⃣ **Arquitetura usada por plataformas tipo iFood (microserviços)**
2️⃣ **Banco de dados profissional (40+ tabelas)**
3️⃣ **Código inicial do backend completo**
4️⃣ **Interface do app do garçom**
5️⃣ **Sistema de QR Code para clientes pedirem**
6️⃣ **Plano de desenvolvimento passo a passo**

Tecnologias principais:

* NestJS (API)
* PostgreSQL (banco)
* Prisma (ORM)
* Next.js (frontend)
* Socket.IO (tempo real)
* Docker (infraestrutura)

---

# 1️⃣ Arquitetura profissional tipo iFood (microserviços)

Grandes apps como iFood e Uber usam **microserviços**.

Estrutura:

```
API GATEWAY
     │
     ├── Auth Service
     ├── Restaurant Service
     ├── Orders Service
     ├── Payments Service
     ├── Kitchen Service
     └── Notification Service
```

Fluxo de pedido:

```
Cliente / Garçom
      │
API Gateway
      │
Orders Service
      │
Database
      │
Event Bus
      │
Kitchen Service
      │
Tela da cozinha
```

Comunicação:

* HTTP
* filas de mensagens
* eventos

Ferramentas comuns:

* Apache Kafka
* RabbitMQ
* Redis

Para um restaurante pequeno, **monólito modular** já é suficiente.

---

# 2️⃣ Banco de dados PROFISSIONAL (POS)

Aqui está um modelo parecido com sistemas comerciais.

## Usuários

```
users
roles
permissions
role_permissions
sessions
```

---

## Restaurante

```
restaurants
restaurant_settings
restaurant_hours
restaurant_addresses
restaurant_taxes
```

---

## Funcionários

```
employees
employee_roles
employee_shifts
employee_permissions
```

---

## Mesas

```
tables
table_sections
table_reservations
table_status_history
```

---

## Cardápio

```
categories
products
product_images
product_variants
product_options
product_option_values
product_prices
```

---

## Pedidos

```
orders
order_items
order_item_options
order_status_history
order_notes
order_discounts
```

---

## Pagamentos

```
payments
payment_methods
payment_transactions
payment_refunds
```

---

## Estoque

```
inventory_items
inventory_movements
inventory_suppliers
inventory_purchases
inventory_purchase_items
```

---

## Relatórios

```
sales_reports
daily_reports
cash_registers
cash_movements
```

---

Total aproximado:

**40–50 tabelas**.

---

# 3️⃣ Código inicial backend (estrutura real)

Projeto com NestJS.

Estrutura:

```
src
 ├ modules
 │   ├ auth
 │   ├ users
 │   ├ tables
 │   ├ products
 │   ├ orders
 │   ├ payments
 │   └ kitchen
 │
 ├ database
 │   └ prisma
 │
 ├ websocket
 │
 └ main.ts
```

---

## main.ts

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
 const app = await NestFactory.create(AppModule)

 app.enableCors()

 await app.listen(3000)
}

bootstrap()
```

---

## orders.controller.ts

```ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {

 constructor(private ordersService: OrdersService) {}

 @Post()
 createOrder(@Body() data) {
   return this.ordersService.createOrder(data)
 }

 @Get(':id')
 getOrder(@Param('id') id: string) {
   return this.ordersService.getOrder(id)
 }

}
```

---

## orders.service.ts

```ts
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrdersService {

 async createOrder(data) {

   const order = {
     id: Date.now(),
     table_id: data.table_id,
     items: data.items,
     status: "open"
   }

   return order
 }

 async getOrder(id: string) {
   return { id }
 }

}
```

---

## websocket gateway (cozinha)

```ts
import {
 WebSocketGateway,
 WebSocketServer
} from '@nestjs/websockets'

import { Server } from 'socket.io'

@WebSocketGateway()
export class KitchenGateway {

 @WebSocketServer()
 server: Server

 sendNewOrder(order) {
   this.server.emit("order:new", order)
 }

}
```

---

# 4️⃣ Interface do APP do garçom

Feito com Next.js.

Fluxo:

```
Login
 ↓
Mesas
 ↓
Abrir mesa
 ↓
Adicionar pedido
 ↓
Enviar cozinha
```

---

## Tela mesas

```
+-------------------+
|     MESAS         |
+-------------------+

[ 1 ] 🟢 Livre
[ 2 ] 🔴 Ocupada
[ 3 ] 🟢 Livre
[ 4 ] 🔴 Ocupada
[ 5 ] 🟢 Livre
```

---

## Tela pedido

```
Mesa 4

Pedidos
2x Burger
1x Coca

Total R$45

[Adicionar item]
[Enviar cozinha]
[Fechar conta]
```

---

## Tela cardápio

```
Categorias

🍔 Lanches
🥤 Bebidas
🍟 Porções

Itens

Burger
R$25

Batata
R$18
```

---

# 5️⃣ Sistema de QR Code para mesa pedir sozinho

Cada mesa terá um QR Code.

Exemplo:

```
https://app.com/m/mesa/12
```

Cliente escaneia.

---

Fluxo:

```
Cliente escaneia QR
      │
Abre cardápio
      │
Seleciona itens
      │
Cria pedido
      │
Cozinha recebe
```

---

## Gerar QR code

Biblioteca:

```
qrcode
```

exemplo:

```ts
import QRCode from "qrcode"

QRCode.toFile("mesa12.png", "https://app.com/m/mesa/12")
```

---

Tela do cliente:

```
Cardápio

Burger
R$25

Batata
R$18

[Adicionar]

Carrinho
Total R$43

[Enviar pedido]
```

---

# 6️⃣ Roadmap completo (PASSO A PASSO)

### Semana 1

Infraestrutura

1️⃣ Criar API
2️⃣ Configurar banco
3️⃣ Criar tabelas

---

### Semana 2

Backend

4️⃣ CRUD produtos
5️⃣ CRUD mesas
6️⃣ CRUD pedidos

---

### Semana 3

Tempo real

7️⃣ WebSocket
8️⃣ Tela da cozinha

---

### Semana 4

Frontend

9️⃣ App do garçom
10️⃣ Sistema QR code

---

Resultado final:

```
Garçom App
Cliente QR
Tela Cozinha
API
Banco
Relatórios
```

---

# 🚀 Se quiser, posso também te mostrar algo MUITO útil:

### 🔥 Projeto real de restaurante SaaS

Posso te mostrar:

✅ **Arquitetura usada por startups (100+ restaurantes)**
✅ **Banco com 80 tabelas**
✅ **Sistema de impressão automática na cozinha**
✅ **Controle de estoque automático**
✅ **Sistema de multi-restaurante (SaaS)**
✅ **Dashboard administrativo completo**

E também posso montar para você um **PROJETO COMPLETO de restaurante pronto para rodar** (estrutura profissional que economiza uns **3-4 meses de desenvolvimento**).

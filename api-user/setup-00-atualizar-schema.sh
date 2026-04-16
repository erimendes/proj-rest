#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-user"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔄 ATUALIZANDO SCHEMA GLOBAL DO PRISMA${NC}"

#########################################
# PASSO 1: SOBRESCREVER O SCHEMA.PRISMA
#########################################
echo -e "${GREEN}👉 Passo 1: Aplicando nova estrutura de tabelas...${NC}"

cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}

// --- MÓDULO DE USUÁRIOS ---
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String
  name      String?
  role      Role      @default(USER)
  sessions  Session[]
  orders    Order[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

enum Role {
  USER
  ADMIN
  MANAGER
  WAITER
  CHEF
}

model Session {
  id           String   @id @default(uuid())
  refreshToken String
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userAgent    String?
  ip           String?
  revoked      Boolean  @default(false)
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}

// --- MÓDULO DE CARDÁPIO ---
model Category {
  id       String    @id @default(uuid())
  name     String    @unique
  imageUrl String?
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
  createdAt   DateTime    @default(now())
}

// --- MÓDULO DE ATENDIMENTO ---
model Table {
  id      String      @id @default(uuid())
  number  Int         @unique
  status  TableStatus @default(FREE)
  orders  Order[]
}

enum TableStatus {
  FREE
  OCCUPIED
  RESERVED
}

// --- MÓDULO DE PEDIDOS ---
model Order {
  id         String      @id @default(uuid())
  tableId    String
  table      Table       @relation(fields: [tableId], references: [id])
  userId     String      
  user       User        @relation(fields: [userId], references: [id])
  status     OrderStatus @default(PENDING)
  totalPrice Decimal     @default(0) @db.Decimal(10, 2)
  items      OrderItem[]
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
}

model OrderItem {
  id          String  @id @default(uuid())
  status      String  @default("PENDING")
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  quantity    Int
  unitPrice   Decimal @db.Decimal(10, 2)
  observation String?

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

#########################################
# PASSO 2: SINCRONIZAR BANCO E TIPOS
#########################################
echo -e "${GREEN}👉 Passo 2: Sincronizando com o PostgreSQL (db push)...${NC}"
npx prisma db push

echo -e "${GREEN}👉 Passo 3: Gerando Prisma Client (generate)...${NC}"
npx prisma generate

echo -e "\n${BLUE}✅ SCHEMA ATUALIZADO COM SUCESSO!${NC}"
echo -e "As tabelas de Pedidos, Mesas e Produtos já existem no seu banco."
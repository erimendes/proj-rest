// Configuração do Banco de Dados
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- TABELAS DE NÚCLEO ---

model Asset {
  id             Int          @id @default(autoincrement())
  hostname       String?      @unique
  serialNumber   String       @unique @map("serial_number")
  assetTag       String?      @unique @map("asset_tag")
  purchaseDate   DateTime?    @map("purchase_date")
  warrantyExpiry DateTime?    @map("warranty_expiry")
  
  // Relacionamentos
  status         Status       @relation(fields: [statusId], references: [id])
  statusId       Int          @map("status_id")
  
  model          Model        @relation(fields: [modelId], references: [id])
  modelId        Int          @map("model_id")

  location       Location?    @relation(fields: [locationId], references: [id])
  locationId     Int?         @map("location_id")

  assignments    Assignment[]
  
  createdAt      DateTime     @default(now()) @map("created_at")
  updatedAt      DateTime     @updatedAt @map("updated_at")

  @@map("assets")
}

model User {
  id           Int          @id @default(autoincrement())
  username     String       @unique // Login do AD (Ex: joao.silva)
  fullName     String       @map("full_name")
  email        String       @unique
  
  department   Department   @relation(fields: [departmentId], references: [id])
  departmentId Int          @map("department_id")

  assignments  Assignment[]

  createdAt    DateTime     @default(now()) @map("created_at")
  @@map("users")
}

// --- GESTÃO DE MOVIMENTAÇÃO (HISTÓRICO) ---

model Assignment {
  id         Int       @id @default(autoincrement())
  asset      Asset     @relation(fields: [assetId], references: [id])
  assetId    Int       @map("asset_id")
  user       User      @relation(fields: [userId], references: [id])
  userId     Int       @map("user_id")
  
  assignedAt DateTime  @default(now()) @map("assigned_at")
  returnedAt DateTime? @map("returned_at")

  @@map("assignments")
}

// --- TABELAS DE APOIO (AUXILIARES) ---

model Model {
  id           Int     @id @default(autoincrement())
  name         String  // Ex: Latitude 3420
  manufacturer String  // Ex: Dell
  category     String  // Ex: Notebook, Desktop, Monitor
  assets       Asset[]

  @@map("models")
}

model Status {
  id     Int     @id @default(autoincrement())
  name   String  // Ex: Em Uso, Estoque, Manutenção, Descartado
  assets Asset[]

  @@map("status")
}

model Department {
  id    Int    @id @default(autoincrement())
  name  String @unique // Ex: TI, Financeiro, RH
  users User[]

  @@map("departments")
}

model Location {
  id     Int     @id @default(autoincrement())
  name   String  // Ex: Matriz - Sala 202
  assets Asset[]

  @@map("locations")
}
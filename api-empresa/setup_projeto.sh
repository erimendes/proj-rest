#!/bin/bash

set -e

PROJECT_NAME="it-asset-manager"


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

cat << 'EOF' > prisma/schema.prisma
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
EOF

# ESTRUTURA MODERNA
echo "📁 Criando estrutura..."

mkdir -p src/{config,modules,shared}
mkdir -p src/modules/asset/{controllers,services,repositories,dtos,routes}

# ENV
cat << 'EOF' > .env
DATABASE_URL="postgresql://admin:123456789@localhost:5432/it_asset_manager?schema=public"
PORT=3000
EOF

# PRISMA CLIENT
cat << 'EOF' > src/config/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
EOF

# APP
cat << 'EOF' > src/app.ts
import express from 'express'
import cors from 'cors'
import { assetRoutes } from './modules/asset/routes/asset.routes'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/assets', assetRoutes)
EOF

# SERVER
cat << 'EOF' > src/server.ts
import { app } from './app'
import { env } from './config/env'

app.listen(env.PORT, () => {
  console.log(\`🚀 Server running on port \${env.PORT}\`)
})
EOF

mkdir -p src/config
cat << 'EOF' > src/config/env.ts
import 'dotenv/config'

export const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL
}
EOF

# ROUTES
cat << 'EOF' > src/modules/asset/routes/asset.routes.ts
import { Router } from 'express'
import { createAssetController } from '../controllers/createAsset.controller'

const router = Router()

router.post('/', createAssetController)

export const assetRoutes = router
EOF

# CONTROLLER
cat << 'EOF' > src/modules/asset/controllers/createAsset.controller.ts
import { Request, Response } from 'express'
import { createAssetService } from '../services/createAsset.service'

export async function createAssetController(req: Request, res: Response) {
  const result = await createAssetService(req.body)
  return res.status(201).json(result)
}
EOF

# SERVICE
cat << 'EOF' > src/modules/asset/services/createAsset.service.ts
import { prisma } from '../../../config/prisma'

export async function createAssetService(data: { serialNumber: string }) {
  return prisma.asset.create({
    data
  })
}
EOF

# SCRIPTS NO PACKAGE.JSON
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json'));

pkg.scripts = {
  dev: 'ts-node-dev --respawn --transpile-only src/server.ts',
  build: 'tsc',
  start: 'node dist/server.js',
  prisma: 'prisma studio'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# ESLINT
cat << 'EOF' > .eslintrc.json
{
  "env": { "node": true, "es2022": true },
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": { "ecmaVersion": "latest" }
}
EOF

# PRETTIER
cat << 'EOF' > .prettierrc
{
  "semi": false,
  "singleQuote": true
}
EOF

echo "--------------------------------------------------"
echo "✅ API moderna criada com sucesso!"
echo ""
echo "📍 Próximos passos:"
echo "1. Ajustar DATABASE_URL no .env"
echo "2. Rodar: npx prisma migrate dev --name init"
echo "3. Rodar: npm run dev"
echo ""
echo "🔥 Estrutura pronta para escalar (DDD-like)"
echo "--------------------------------------------------"
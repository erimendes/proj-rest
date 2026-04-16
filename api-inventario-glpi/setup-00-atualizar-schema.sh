#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-restaurante"
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

// ==========================================
// 5. PESSOAL E CUSTÓDIA
// ==========================================

model Usuario {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String
  name         String?
  role         Role      @default(USER)
  departamento String?
  ativos       Ativo[] 
  sessions     Session[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// --- MÓDULO DE SESSÕES ---
model Session {
  id           String   @id @default(uuid())
  refreshToken String
  usuarioId    String
  usuario      Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)
  userAgent    String?
  ip           String?
  revoked      Boolean  @default(false)
  expiresAt    DateTime
  createdAt    DateTime @default(now())
}

// --- ENUMS PARA PADRONIZAÇÃO ---

enum Role {
  USER
  ADMIN
}


// ==========================================
// 1. INVENTÁRIO DE HARDWARE (Ativos e Servidores)
// ==========================================

model Ativo {
  id              Int           @id @default(autoincrement())
  tagPatrimonial  String        @unique
  tipo            AtivoTipo     @default(LAPTOP)
  fabricante      String
  modelo          String
  numSerie        String        @unique
  hostname        String?       @unique
 
  // Especificações técnicas (Baseado na sua lista)
  cpu             String?
  ram             String?
  discoFisico     String?
  status          AtivoStatus   @default(DISPONIVEL)
  emUso           Boolean       @default(true)
  dataCompra      DateTime?
  valor           Decimal?      @db.Decimal(10, 2)

  // Virtualização (Hyper-V / VMware)
  isVirtualizado  Boolean       @default(false)
  hyperVName      String?       // Nome da VM no Hyper-V
  hostFisicoId    Int?          // Se for VM, aponta para o ID do servidor físico
  vms             Ativo[]       @relation("HostVms")
  host            Ativo?        @relation("HostVms", fields: [hostFisicoId], references: [id])

  // Relacionamentos
  usuarioId       Int?
  usuario         Usuario?      @relation(fields: [usuarioId], references: [id])
  configRede      ConfigRede?
  licencas        LicencaAtivo[]
  aplicacoes      Aplicacao[]   @relation("AppServidores")

  observacoes     String?       @db.Text
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

// ==========================================
// 2. INVENTÁRIO DE SISTEMAS (Sua imagem do Excel)
// ==========================================

model Aplicacao {
  id                Int              @id @default(autoincrement())
  nome              String
  sigla             String?          @unique
  descricao         String?          @db.Text
  categoria         SistemaCategoria @default(OPERACIONAL)
  criticidade       Criticidade      @default(MEDIA)
 
  // Gestão de Negócio (Campos da imagem)
  businessOwner     String?          // Área Usuária
  responsavelTecnico String?         // Responsável STI
  contatoFuncional  String?
  fornecedor        String?
 
  // Resiliência e Operação
  janelaOperacao    String?          // Ex: 24/7
  backupInfo        String?          // Existe/Onde
  procedimentoRecup String?          @db.Text
  pontoUnicoFalha   String?          @db.Text

  // Stack Tecnológica
  tecnologiaPrincipal String?        // Stack
  databaseInfo        String?        // Tipo/SGBD e Versão
  integracoes         String?        @db.Text

  // Relacionamento: Onde a aplicação está hospedada
  servidores        Ativo[]          @relation("AppServidores")
}

// ==========================================
// 3. INFRAESTRUTURA DE REDE
// ==========================================

model ConfigRede {
  id             Int     @id @default(autoincrement())
  ipAddress      String?
  macAddress     String  @unique
  vlan           Int?
  portasUTP      Int?
  portasFibra    Int?
  storageConect  String? // Nome do Storage/LUN
  discoStorage   String? // Tamanho alocado no Storage
 
  ativo          Ativo   @relation(fields: [ativoId], references: [id])
  ativoId        Int     @unique
}

// ==========================================
// 4. SOFTWARE E LICENCIAMENTO
// ==========================================

model Software {
  id          Int       @id @default(autoincrement())
  nome        String
  versao      String?
  fabricante  String
  licencas    Licenca[]
}

model Licenca {
  id             Int            @id @default(autoincrement())
  chaveAtivacao  String         @unique
  dataExpiracao  DateTime?
  software       Software       @relation(fields: [softwareId], references: [id])
  softwareId     Int
  instacoes      LicencaAtivo[]
}

model LicencaAtivo {
  id        Int      @id @default(autoincrement())
  ativo     Ativo    @relation(fields: [ativoId], references: [id])
  ativoId   Int
  licenca   Licenca  @relation(fields: [licencaId], references: [id])
  licencaId Int
  dataInstalacao DateTime @default(now())

  @@unique([ativoId, licencaId])
}

// --- ENUMS PARA PADRONIZAÇÃO ---

enum AtivoTipo {
  LAPTOP
  DESKTOP
  SERVIDOR_FISICO
  SERVIDOR_VIRTUAL
  SWITCH
  ROTEADOR
  STORAGE
  MONITOR
}

enum AtivoStatus {
  DISPONIVEL
  EM_USO
  MANUTENCAO
  DESCARTADO
}

enum SistemaCategoria {
  ADMINISTRATIVO
  OPERACIONAL
}

enum Criticidade {
  BAIXA
  MEDIA
  ALTA
  CRITICA
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
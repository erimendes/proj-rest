#!/bin/bash
set -e

PROJECT_NAME="api-inventario"

cd $PROJECT_NAME

# 1. Verificação e Instalação de Dependências Críticas
echo -e "${YELLOW}📦 Verificando dependências de bibliotecas...${NC}"
# Instala silenciosamente o que falta para os scripts rodarem
npm install axios csv-parser --save-dev
npm install csv-parse
npm install -D @types/csv-parse

mkdir -p src/scripts

echo "📝 Criando arquivo prisma/schema.prisma com o schema completo..."
echo "🔧 Schema02 prisma/schema.prisma para usar o adapter do PostgreSQL..."
cat << 'EOF' > prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// --- ENUMS PROFISSIONAIS ---
enum Role {
  USER
  ADMIN
}

enum ComputerType {
  DESKTOP
  NOTEBOOK
  SERVER
  VM
  OTHER
}

enum ComputerRole {
  USER   // Máquina de uso pessoal/estação de trabalho
  SERVER // Máquina que provê serviços (AD, Web, DB)
}

// --- USUÁRIOS ---
model User {
  id           Int         @id @default(autoincrement())
  username     String      @unique
  fullName     String      @map("full_name")
  email        String      @unique
  password     String
  role         Role        @default(USER)

  department   Department? @relation(fields: [departmentId], references: [id])
  departmentId Int?        @map("department_id")

  assignments  Assignment[]
  createdAt    DateTime    @default(now()) @map("created_at")

  @@map("users")
}

// --- GESTÃO DE MOVIMENTAÇÃO ---
model Assignment {
  id         Int       @id @default(autoincrement())
  computer   Computer  @relation(fields: [computerId], references: [id])
  computerId Int       @map("computer_id")
  user       User      @relation(fields: [userId], references: [id])
  userId     Int       @map("user_id")
  
  assignedAt DateTime  @default(now()) @map("assigned_at")
  returnedAt DateTime? @map("returned_at")

  @@map("assignments")
}

// --- TABELAS AUXILIARES ---
model Status {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("statuses")
}

model DeviceModel {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("device_models")
}

model Department {
  id    Int    @id @default(autoincrement())
  name  String @unique
  users User[]

  @@map("departments")
}

model Location {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  computers Computer[]

  @@map("locations")
}

// --- ENTIDADE PRINCIPAL: COMPUTER ---
model Computer {
  id             Int      @id @default(autoincrement())
  glpiId         Int?      @unique
  hostname       String
  hostFisico     String?  // Máquina física associada
  nameHaperv     String?  // Nome Hyper-V / VM
  mainIp         String   @unique @db.VarChar(45)

  alternateUser  String?
  user           String?  // Usuário logado via inventário

  type           ComputerType @default(DESKTOP)
  role           ComputerRole @default(USER)

  manufacturer   String?
  modelName      String?
  serial         String?

  osName         String?
  osVersion      String?
  osArch         String?

  cpu            String?
  ram            String?
  hd             String?

  // Relacionamentos
  status         Status?      @relation(fields: [statusId], references: [id])
  statusId       Int?

  location       Location?    @relation(fields: [locationId], references: [id])
  locationId     Int?

  deviceModel    DeviceModel? @relation(fields: [deviceModelId], references: [id])
  deviceModelId  Int?

  assignments    Assignment[]
  networkInterfaces NetworkInterface[]
  volumes           Volume[]
  softwares         SoftwareOnComputer[]

  lastSync       DateTime @default(now())

  @@map("computers")
}

// --- DETALHAMENTO TÉCNICO ---
model NetworkInterface {
  id         Int      @id @default(autoincrement())
  glpiId     Int?
  name       String?
  macAddress String?
  ipAddress  String?  @db.VarChar(45)

  computer   Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId Int

  @@map("network_interfaces")
}

model Volume {
  id          Int      @id @default(autoincrement())
  glpiId      Int?
  mountPoint  String?
  capacityGb  Float

  computer    Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId  Int

  @@map("volumes")
}

model Software {
  id        Int      @id @default(autoincrement())
  glpiId    Int      @unique
  name      String
  version   String?
  publisher String?

  computers SoftwareOnComputer[]

  @@map("softwares")
}

model SoftwareOnComputer {
  computer   Computer @relation(fields: [computerId], references: [id], onDelete: Cascade)
  computerId Int

  software   Software @relation(fields: [softwareId], references: [id], onDelete: Cascade)
  softwareId Int

  @@id([computerId, softwareId])
  @@map("software_on_computers")
}
EOF

echo "🔧 Criando a pasta de scripts para sincronização com o GLPI..."
mkdir -p src/scripts

echo "🔧 Criando glpi-sync.ts para sincronizar o banco de dados usando o Prisma Client e o adapter do PostgreSQL..."
cat << 'EOF' > src/scripts/glpi-sync.ts
// src/scripts/glpi-sync.ts
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
import { PrismaClient, ComputerType, ComputerRole } from '../generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const GLPI_URL = process.env.GLPI_URL!;
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

async function getCsvComputers() {
  const results: any[] = [];
  if (!fs.existsSync('dados_iniciais.csv')) return results;

  return new Promise<any[]>((resolve) => {
    fs.createReadStream('dados_iniciais.csv')
      .pipe(csv())
      .on('data', (data) => {
        if (data.hostname?.trim() || data.mainIp?.trim()) results.push(data);
      })
      .on('end', () => resolve(results));
  });
}

async function syncGlpiFromCsv() {
  const csvComputers = await getCsvComputers();
  if (!csvComputers.length) {
    console.log('❌ Nenhum computador válido no CSV.');
    return;
  }

  // Inicia sessão GLPI
  const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
    headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
  });
  const sessionToken = sessionRes.data.session_token;

  // Buscar computadores do GLPI
  const glpiRes = await axios.get(`${GLPI_URL}/Computer`, {
    params: { expand_dropdowns: true, get_full_details: true, range: '0-1000' },
    headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
  });
  const glpiComputers = glpiRes.data;

  for (const csvRow of csvComputers) {
    const filterHostname = csvRow.hostname?.trim();
    const filterIp = csvRow.mainIp?.trim();

    const glpiComp = glpiComputers.find((c: any) =>
      (filterHostname && c.name === filterHostname) ||
      (filterIp && c._networks?.some((n: any) => n.ip === filterIp))
    );

    if (!glpiComp) {
      console.log(`⚠️ Computador não encontrado no GLPI: ${filterHostname || filterIp}`);
      continue;
    }

    // Determina tipo e role
    let type: ComputerType = ComputerType.DESKTOP;
    let role: ComputerRole = ComputerRole.USER;

    if (
      (typeof glpiComp.operatingsystems_id === 'string' && glpiComp.operatingsystems_id.toLowerCase().includes('server')) ||
      (glpiComp.name?.toLowerCase().includes('srv'))
    ) {
      type = ComputerType.SERVER;
      role = ComputerRole.SERVER;
    }

    const mainIpSafe = filterIp || glpiComp._networks?.[0]?.ip;
    if (!mainIpSafe) {
      console.log(`⚠️ Computador ${glpiComp.name} não tem IP, pulando...`);
      continue;
    }

    await prisma.computer.upsert({
      where: { mainIp: mainIpSafe },
      update: {
        hostname: glpiComp.name,
        alternateUser: glpiComp.contact,
        user: glpiComp.users_id_tech || '',
        manufacturer: glpiComp.manufacturers_id?.toString() || 'Unknown',
        modelName: glpiComp.computermodels_id?.toString() || 'Generic',
        osName: glpiComp.operatingsystems_id?.toString(),
        type,
        role,
        lastSync: new Date()
      },
      create: {
        glpiId: glpiComp.id,
        hostname: glpiComp.name,
        mainIp: mainIpSafe,
        alternateUser: glpiComp.contact,
        manufacturer: glpiComp.manufacturers_id?.toString() || 'Unknown',
        modelName: glpiComp.computermodels_id?.toString() || 'Generic',
        serial: glpiComp.serial,
        osName: glpiComp.operatingsystems_id?.toString(),
        type,
        role,
        networkInterfaces: {
          create: glpiComp._networks?.map((n: any) => ({
            name: n.name,
            ipAddress: n.ip,
            macAddress: n.mac
          })) || []
        }
      }
    });

    console.log(`✅ Sincronizado: ${glpiComp.name}`);
  }

  // Finaliza sessão GLPI
  await axios.get(`${GLPI_URL}/killSession`, {
    headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
  });

  await prisma.$disconnect();
  console.log('🎉 Sincronização finalizada!');
}

syncGlpiFromCsv();
EOF

echo "🔧 Criando seed-csv.ts"
cat << 'EOF' > src/scripts/seed-csv.ts
// src/scripts/seed-csv.ts
import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
// Importação correta para ESM e para o local padrão do Prisma
import { PrismaClient, ComputerType, ComputerRole } from "../generated/prisma/client.js"; 

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedFromCSV() {
  const csvPath = 'dados_iniciais.csv';

  if (!fs.existsSync(csvPath)) {
    console.error('❌ Arquivo dados_iniciais.csv não encontrado na raiz!');
    return;
  }

  console.log('🚀 Iniciando leitura do CSV...');

  const results: any[] = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        try {
          // Garantir valores obrigatórios
          const mainIp = row.mainIp?.trim();
          const hostname = row.hostname?.trim() || mainIp;
          const hostFisico = row.hostFisico?.trim() || hostname;
          const nameHaperv = row.nameHaperv?.trim() || hostname;

          if (!mainIp) {
            console.warn(`⚠️ Pulando registro sem mainIp: ${JSON.stringify(row)}`);
            continue;
          }

          // Determina tipo
          const tipoStr = row.tipo?.toLowerCase() || '';
          let type: ComputerType = ComputerType.DESKTOP;
          if (tipoStr.includes('server')) type = ComputerType.SERVER;
          else if (tipoStr.includes('notebook')) type = ComputerType.NOTEBOOK;
          else if (row.VM?.toLowerCase() === 'sim' || row.fabricante?.toLowerCase().includes('virtual')) type = ComputerType.VM;

          const role: ComputerRole = (type === ComputerType.SERVER || type === ComputerType.VM)
            ? ComputerRole.SERVER
            : ComputerRole.USER;

          // Upsert seguro
          await prisma.computer.upsert({
            where: { mainIp },
            update: {
              hostname,
              hostFisico,
              nameHaperv,
              manufacturer: row.fabricante || 'Unknown',
              modelName: row.modelo || 'Unknown',
              osName: row.sistema_operacional || 'Unknown',
              cpu: row.cpu || 'Unknown',
              ram: row.ram || 'Unknown',
              hd: row.hd || 'Unknown',
              type,
              role,
              lastSync: new Date()
            },
            create: {
              mainIp,
              hostname,
              hostFisico,
              nameHaperv,
              manufacturer: row.fabricante || 'Unknown',
              modelName: row.modelo || 'Unknown',
              osName: row.sistema_operacional || 'Unknown',
              cpu: row.cpu || 'Unknown',
              ram: row.ram || 'Unknown',
              hd: row.hd || 'Unknown',
              type,
              role
            }
          });

          console.log(`✅ Processado: ${hostname} (${mainIp})`);
        } catch (err: any) {
          console.error(`❌ Erro no registro ${row.mainIp}:`, err.message);
        }
      }

      console.log('🏁 Importação concluída!');
      await prisma.$disconnect();
      await pool.end();
    });
}

seedFromCSV().catch(err => console.error("Erro fatal no seed:", err));
EOF

echo "🔧 Configurando variáveis de ambiente para o GLPI..." 
cat << 'EOF' > .env
DATABASE_URL="postgresql://admin:123456789@localhost:5432/inventario_db?schema=public"
JWT_SECRET="super-secret-app-token"
GLPI_URL=http://192.168.15.20/apirest.php
GLPI_USER_TOKEN=SEU_USER_TOKEN_AQUI
GLPI_APP_TOKEN="super-secret-app-token"
EOF

# Cores para o terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

echo -e "${BLUE}==== 🔧 INICIANDO DEPLOY AUTOMATIZADO ==== ${NC}"

# 2. Configuração do Banco de Dados com Prisma
# echo -e "${YELLOW}🗄️  Instanciando banco de dados e rodando Migrations...${NC}"
# O dev --name init cria as tabelas se não existirem
# npx prisma migrate dev --name init

echo -e "${YELLOW}⚙️  Gerando Prisma Client...${NC}"
npx prisma generate

# # 3. Carga Inicial do CSV (Dono dos IPs)
# if [ -f "dados_iniciais.csv" ]; then
#     echo -e "${GREEN}📥 Populando banco via CSV (Semente de IPs)...${NC}"
#     npx tsx src/scripts/seed-csv.ts
# else
#     echo -e "${YELLOW}⚠️  Aviso: dados_iniciais.csv não encontrado, pulando carga inicial.${NC}"
# fi

# # 4. Sincronização com GLPI Real
# echo -e "${GREEN}🔄 Sincronizando dados reais do GLPI (192.168.15.20)...${NC}"
# # Aqui o script vai usar o IP como chave para não duplicar o que veio do CSV
# npx ts-node src/scripts/glpi-sync.ts

# # 5. Garantir dados estruturais (Seed de Departamentos/Status)
# echo -e "${YELLOW}🌱 Rodando seed de tabelas auxiliares (Status/Departamentos)...${NC}"
# npx prisma db seed

echo -e "${BLUE}==========================================${NC}"
echo -e "${GREEN}✅ PROCESSO CONCLUÍDO COM SUCESSO!${NC}"
echo -e "${BLUE}Sua base de dados está sincronizada e pronta.${NC}"
echo -e "Dica: Para visualizar os dados, use: npx prisma studio"


echo "🔧 Rodando seed para garantir que o departamento de TI exista...  "
echo "npx prisma db seed ou npx tsx prisma/seed.ts ou npm install -D tsx"

echo "✅ Prisma schema configurado e client gerado com sucesso."
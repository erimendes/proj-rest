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
import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
import { PrismaClient, ComputerType, ComputerRole } from '../generated/prisma/client.js';

// Configurações de Ambiente
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const GLPI_URL = process.env.GLPI_URL!;
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

// --- FUNÇÕES AUXILIARES DE HARDWARE ---
async function getHardwareSpecs(glpiId: number, sessionToken: string, headers: any) {
  try {
    const [cpuRes, ramRes, driveRes] = await Promise.all([
      axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceProcessor`, { headers }),
      axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceMemory`, { headers }),
      axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceDrive`, { headers })
    ]);

    // Processa CPU
    const cpu = cpuRes.data?.[0]?.designation || "Unknown CPU";

    // Soma RAM (converte para GB para facilitar a leitura no AIOps)
    const totalRamMb = ramRes.data?.reduce((acc: number, cur: any) => acc + (parseInt(cur.size) || 0), 0) || 0;
    const ram = totalRamMb > 0 ? `${(totalRamMb / 1024).toFixed(1)} GB` : "Unknown RAM";

    // Processa Discos
    const drives = driveRes.data?.map((d: any) => ({
      mountPoint: d.designation || 'Disk',
      capacityGb: Math.round((parseInt(d.capacity) || 0) / 1024)
    })) || [];

    const totalHd = drives.reduce((acc: number, cur: any) => acc + cur.capacityGb, 0);

    return { cpu, ram, hd: `${totalHd} GB`, drives };
  } catch (e) {
    console.error(`      ⚠️ Erro ao buscar hardware para ID ${glpiId}`);
    return { cpu: "N/A", ram: "N/A", hd: "N/A", drives: [] };
  }
}

async function getCsvComputers() {
  const results: any[] = [];
  if (!fs.existsSync('dados_iniciais.csv')) return results;
  return new Promise<any[]>((resolve) => {
    fs.createReadStream('dados_iniciais.csv')
      .pipe(csv())
      .on('data', (data) => { if (data.hostname?.trim() || data.mainIp?.trim()) results.push(data); })
      .on('end', () => resolve(results));
  });
}

// --- FUNÇÃO PRINCIPAL DE SINCRONIZAÇÃO ---

async function syncGlpi() {
  const csvComputers = await getCsvComputers();
  if (!csvComputers.length) return console.log("❌ CSV vazio ou não encontrado.");

  try {
    console.log('🔑 Autenticando no GLPI...');
    const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
      headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
    });
    const sessionToken = sessionRes.data.session_token;
    const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };

    console.log('🔍 Baixando inventário e mapa de virtualização...');
    const [compRes, vmRes] = await Promise.all([
      axios.get(`${GLPI_URL}/Computer`, { params: { expand_dropdowns: true, get_full_details: true, range: '0-1000' }, headers }),
      axios.get(`${GLPI_URL}/Computer_VirtualMachine`, { headers })
    ]);

    const glpiComputers = compRes.data;
    const vmMap = new Map();
    if (Array.isArray(vmRes.data)) {
      vmRes.data.forEach((vm: any) => vmMap.set(vm.items_id, vm.items_id_tech));
    }

    for (const csvRow of csvComputers) {
      const filterHostname = csvRow.hostname?.trim();
      const filterIp = csvRow.mainIp?.trim();

      const glpiComp = glpiComputers.find((c: any) => 
        (filterHostname && c.name === filterHostname) || 
        (filterIp && c._networks?.some((n: any) => n.ip === filterIp))
      );

      if (!glpiComp) continue;

      console.log(`\n🚀 Sincronizando: ${glpiComp.name}`);

      // Busca Hardware (CPU, RAM, HD)
      const hw = await getHardwareSpecs(glpiComp.id, sessionToken, headers);

      // Lógica de Host Físico
      let type: ComputerType = ComputerType.DESKTOP; // Valor padrão usando o Enum
      let hostFisico = glpiComp.name;

      if (vmMap.has(glpiComp.id)) {
        type = ComputerType.VM;
        const parentId = vmMap.get(glpiComp.id);
        const parentComp = glpiComputers.find((c: any) => c.id === parentId);
        hostFisico = parentComp?.name || "Desconhecido";
      } else if (String(glpiComp.operatingsystems_id).toLowerCase().includes('server')) {
        type = ComputerType.SERVER;
      }

      const mainIpSafe = filterIp || glpiComp._networks?.[0]?.ip;

      // Persistência no Banco
      await prisma.computer.upsert({
        where: { mainIp: mainIpSafe },
        update: {
          hostname: glpiComp.name,
          hostFisico,
          cpu: hw.cpu,
          ram: hw.ram,
          hd: hw.hd,
          type,
          manufacturer: String(glpiComp.manufacturers_id || 'Unknown'),
          modelName: String(glpiComp.computermodels_id || 'Generic'),
          osName: String(glpiComp.operatingsystems_id || 'N/A'),
          lastSync: new Date(),
          volumes: {
            deleteMany: {},
            create: hw.drives
          }
        },
        create: {
          glpiId: glpiComp.id,
          hostname: glpiComp.name,
          mainIp: mainIpSafe,
          hostFisico,
          cpu: hw.cpu,
          ram: hw.ram,
          hd: hw.hd,
          type,
          serial: glpiComp.serial || 'N/A'
        }
      });
      console.log(`   ✅ Hardware e Topologia processados.`);
    }

    await axios.get(`${GLPI_URL}/killSession`, { headers });
    console.log('\n🎉 Sincronização concluída com sucesso!');

  } catch (error: any) {
    console.error('❌ Erro fatal:', error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

syncGlpi();
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
          // PEGA EXATAMENTE O QUE ESTÁ NO CSV
          // .trim() remove espaços, mas se o resultado for vazio "", 
          // ele manterá vazio ou você pode definir um padrão.
          let hostFisico = row.hostfisico?.trim(); 

          // Lógica para garantir que não fique nulo, 
          // mas respeite a hierarquia do seu CSV:
          if (!hostFisico || hostFisico === "") {
              // Se for um servidor físico (não tem hostFisico no CSV), 
              // ele é o seu próprio host.
              hostFisico = hostname; 
          }
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
            where: { mainIp: row.mainIp },
            update: {
              hostname: row.hostname,
              hostFisico: hostFisico,
              nameHaperv: nameHaperv,
              manufacturer: row.fabricante || 'Unknown',
              modelName: row.modelo || 'Unknown',
              osName: row['sistema operacional'] || 'Unknown',
              cpu: row.cpu || 'Unknown',
              ram: row.ram || 'Unknown',
              hd: row.hd || 'Unknown',
              type,
              role,
              lastSync: new Date()
            },
            create: {
              mainIp: row.mainIp,
              hostname: row.hostname,
              hostFisico: hostFisico,
              nameHaperv: nameHaperv,
              manufacturer: row.fabricante || 'Unknown', 
              modelName: row.modelo || 'Unknown',
              osName: row['sistema operacional'] || 'Unknown',
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
GLPI_APP_TOKEN="super-secret-app-token"
GLPI_USER_TOKEN="seu_token_de_usuario_glpi"
EOF

echo " Criando glpi-sync-csv.ts para sincronizar o banco de dados usando o Prisma Client, o adapter do PostgreSQL e os dados do CSV..."
cat << 'EOF' > src/scripts/glpi-sync-csv.ts
// src/scripts/glpi-sync-csv.ts
import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
// Importação corrigida dos Enums para evitar erro de tipagem
import { PrismaClient, ComputerType, ComputerRole } from '../generated/prisma/client.js';

// Configurações de Ambiente
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const GLPI_URL = process.env.GLPI_URL!;
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

// --- FUNÇÃO PARA LER O SERVER.CSV ---
async function getServerCsv() {
  const results: any[] = [];
  // Alterado para ler 'server.csv' conforme solicitado
  if (!fs.existsSync('server.csv')) {
    console.error('❌ Arquivo server.csv não encontrado!');
    return results;
  }

  return new Promise<any[]>((resolve) => {
    fs.createReadStream('server.csv')
      .pipe(csv())
      .on('data', (data) => {
        if (data.hostname?.trim() || data.mainIp?.trim()) {
            results.push({
                hostname: data.hostname?.trim(),
                mainIp: data.mainIp?.trim()
            });
        }
      })
      .on('end', () => {
        console.log(`\n📄 Filtro carregado: ${results.length} servidores para processar.`);
        resolve(results);
      });
  });
}

async function getHardwareSpecs(glpiId: number, headers: any) {
    try {
      const [cpuRes, ramRes, driveRes] = await Promise.all([
        axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceProcessor`, { headers }),
        axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceMemory`, { headers }),
        axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_DeviceDrive`, { headers })
      ]);
  
      const cpu = cpuRes.data?.[0]?.designation || "Unknown CPU";
      const totalRamMb = ramRes.data?.reduce((acc: number, cur: any) => acc + (parseInt(cur.size) || 0), 0) || 0;
      const ram = totalRamMb > 0 ? `${(totalRamMb / 1024).toFixed(1)} GB` : "Unknown RAM";
  
      const drives = driveRes.data?.map((d: any) => ({
        mountPoint: d.designation || 'Disk',
        capacityGb: Math.round((parseInt(d.capacity) || 0) / 1024)
      })) || [];
  
      const totalHd = drives.reduce((acc: number, cur: any) => acc + cur.capacityGb, 0);
  
      return { cpu, ram, hd: `${totalHd} GB`, drives };
    } catch (e) {
      return { cpu: "N/A", ram: "N/A", hd: "N/A", drives: [] };
    }
}

async function syncServers() {
  const targetServers = await getServerCsv();
  if (!targetServers.length) return;

  try {
    const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
      headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
    });
    const sessionToken = sessionRes.data.session_token;
    const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };

    // Busca dados globais para cruzamento
    const [compRes, vmRes] = await Promise.all([
      axios.get(`${GLPI_URL}/Computer`, { params: { expand_dropdowns: true, get_full_details: true, range: '0-1000' }, headers }),
      axios.get(`${GLPI_URL}/Computer_VirtualMachine`, { headers })
    ]);

    const glpiComputers = compRes.data;
    const vmMap = new Map();
    if (Array.isArray(vmRes.data)) {
      vmRes.data.forEach((vm: any) => vmMap.set(vm.items_id, vm.items_id_tech));
    }

    for (const server of targetServers) {
      // Procura no GLPI apenas o que está no seu server.csv
      const glpiComp = glpiComputers.find((c: any) => 
        (server.hostname && c.name === server.hostname) || 
        (server.mainIp && c._networks?.some((n: any) => n.ip === server.mainIp))
      );

      if (!glpiComp) {
        console.warn(`⚠️ Não encontrado no GLPI: ${server.hostname || server.mainIp}`);
        continue;
      }

      console.log(`\n⚙️ Sincronizando: ${glpiComp.name}`);
      const hw = await getHardwareSpecs(glpiComp.id, headers);

      // RESOLUÇÃO DE TIPO E ENUMS (CORREÇÃO DO ERRO DE ASSIGNMENT)
      let type: ComputerType = ComputerType.SERVER; 
      let role: ComputerRole = ComputerRole.SERVER;
      let hostFisico = glpiComp.name;

      if (vmMap.has(glpiComp.id)) {
        type = ComputerType.VM; // Atribuição correta via Enum
        const parentId = vmMap.get(glpiComp.id);
        const parentComp = glpiComputers.find((c: any) => c.id === parentId);
        hostFisico = parentComp?.name || glpiComp.name;
        console.log(`   - Identificado como VM residente em: ${hostFisico}`);
      }

      await prisma.computer.upsert({
        where: { mainIp: server.mainIp || glpiComp._networks?.[0]?.ip },
        update: {
          hostname: glpiComp.name,
          hostFisico,
          cpu: hw.cpu,
          ram: hw.ram,
          hd: hw.hd,
          type, // Agora aceita corretamente
          role,
          lastSync: new Date(),
          volumes: { deleteMany: {}, create: hw.drives }
        },
        create: {
          glpiId: glpiComp.id,
          hostname: glpiComp.name,
          mainIp: server.mainIp || glpiComp._networks?.[0]?.ip,
          hostFisico,
          cpu: hw.cpu,
          ram: hw.ram,
          hd: hw.hd,
          type,
          role,
          serial: glpiComp.serial || 'N/A'
        }
      });
    }

    await axios.get(`${GLPI_URL}/killSession`, { headers });
    console.log('\n✅ Sincronização de servidores finalizada!');

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

syncServers();
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

# 1. Define o arquivo
FILE="tsconfig.json"

echo "Step 1: Sobrescrevendo $FILE com a configuração estável..."

cat <<EOF > $FILE
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
    "paths": {
      "@/*": ["./src/*"],
      "api/*": ["./src/api/*"]
    },
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}
EOF

echo "Step 2: Limpando caches de compilação antigos..."
# Remove o arquivo de cache do modo incremental (se existir)
rm -f tsconfig.tsbuildinfo
# Remove a pasta dist para evitar conflitos de tipos antigos
rm -rf ./dist

echo "--------------------------------------------------------"
echo "✅ Script finalizado!"
echo "⚠️  IMPORTANTE: O VS Code ainda pode manter o erro em cache."
echo "Para resolver 100%, você PRECISA fazer o comando manual:"
echo "1. No VS Code, aperte: Ctrl + Shift + P"
echo "2. Digite: TypeScript: Restart TS Server"
echo "3. Aperte: Enter"
echo "--------------------------------------------------------"

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
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
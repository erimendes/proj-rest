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
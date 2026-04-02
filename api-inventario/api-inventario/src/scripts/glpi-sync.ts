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
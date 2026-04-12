import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

async function syncSoftwares() {
  console.log("🚀 Iniciando sincronização de Softwares...");

  try {
    // 1. Login no GLPI
    const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
      headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
    });
    const headers = { 'Session-Token': sessionRes.data.session_token, 'App-Token': APP_TOKEN };

    const serverName = "APPSIM01";
    const glpiId = 1389;

    // --- BUSCA O COMPUTADOR NO SEU BANCO LOCAL ---
    const dbComputer = await prisma.computer.findFirst({
      where: { hostname: { contains: serverName, mode: 'insensitive' } }
    });

    if (!dbComputer) {
      console.error(`❌ Computador ${serverName} não encontrado no banco local. Sincronize o computador primeiro.`);
      return;
    }

    console.log(`📡 Buscando softwares para: ${dbComputer.hostname} (ID GLPI: ${glpiId})...`);

    // 2. Buscar softwares no GLPI
    const softRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_SoftwareVersion`, {
      params: { expand_dropdowns: true, range: "0-1000" },
      headers
    });

    const rawSofts = softRes.data;
    if (!Array.isArray(rawSofts)) {
      console.warn("⚠️ Nenhum software retornado do GLPI.");
      return;
    }

    // 3. LIMPEZA OPCIONAL: Remove vínculos antigos para não acumular softwares desinstalados
    await prisma.softwareOnComputer.deleteMany({
      where: { computerId: dbComputer.id }
    });

    // 4. LOOP DE GRAVAÇÃO
    for (const s of rawSofts) {
      // --- LOG DE INSPEÇÃO (Opcional: use se quiser ver o JSON de 1 item no terminal) ---
      // console.log(JSON.stringify(s, null, 2)); 

      // 1. Tenta pegar o nome do software de várias chaves possíveis
      const softName = 
        s.softwares_id ||            // Nome expandido pelo dropdown
        s._software_name ||          // Alias comum em algumas versões
        s.software_name || 
        "Desconhecido";

      // 2. Tenta pegar a versão
      const softVersion = 
        s.name ||                    // Na tabela de versões, 'name' costuma ser a versão (ex: 9.20)
        s.softwareversions_id || 
        s.version || 
        "N/A";

      // 3. Tenta pegar o Fabricante (Publisher)
      const softPublisher = 
        s.manufacturers_id || 
        s._manufacturer_name ||
        "N/A";

      const glpiSoftwareId = Number(s.id); 

      // 4. Upsert do Software
      const software = await prisma.software.upsert({
        where: { glpiId: glpiSoftwareId },
        update: {
          name: softName,
          version: softVersion,
          publisher: softPublisher,
        },
        create: {
          glpiId: glpiSoftwareId,
          name: softName,
          version: softVersion,
          publisher: softPublisher,
        },
      });

      // 5. Vínculo Pivot
      await prisma.softwareOnComputer.upsert({
        where: {
          computerId_softwareId: {
            computerId: dbComputer.id,
            softwareId: software.id,
          },
        },
        update: {}, 
        create: {
          computerId: dbComputer.id,
          softwareId: software.id,
        },
      });
    }

    console.log(`✅ Sincronização concluída! ${rawSofts.length} softwares processados.`);

  } catch (error: any) {
    console.error("❌ Erro:", error.response?.data || error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

syncSoftwares();
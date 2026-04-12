import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";

// Passa {} para satisfazer a tipagem
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

async function syncUser() {
  console.log("🚀 Iniciando captura de Usuário/Contato...");

  try {
    // 1. Login
    const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
      headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
    });
    const headers = { 'Session-Token': sessionRes.data.session_token, 'App-Token': APP_TOKEN };

    const serverName = "APPSIM01";
    const glpiId = 1389;

    console.log(`📡 Buscando dados de usuário para o ID ${glpiId}...`);

    // 2. Busca o objeto Computer diretamente
    // Usamos expand_dropdowns para pegar o NOME do usuário em vez do ID
    const compRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}`, {
      params: { expand_dropdowns: true },
      headers
    });

    // ... (parte anterior do login e busca no GLPI)

    const compData = compRes.data;

    // users_id: Usuário vinculado (puxado pelo login ou AD)
    // contact: O campo de texto livre que costuma ter o nome alternativo
    const userName = compData.users_id || "";
    const contactField = compData.contact || "";

    console.log(`✅ Usuário no GLPI: ${userName}`);
    console.log(`✅ Contato Técnico (Alternate): ${contactField}`);

    // --- GRAVAÇÃO NO PRISMA ---
    const dbComputer = await prisma.computer.findFirst({
      where: { hostname: { contains: serverName, mode: 'insensitive' } }
    });

    if (dbComputer) {
      await prisma.computer.update({
        where: { id: dbComputer.id },
        data: { 
          // Gravamos o dono no campo 'user' e o contato livre no 'alternateUser'
          user: String(userName), 
          alternateUser: String(contactField)
        }
      });
      console.log(`💾 Banco atualizado: '${contactField}' salvo em alternateUser.`);
    } else {
      console.error(`❌ O computador ${serverName} não existe no banco local.`);
    }
  } catch (error: any) {
    console.error("❌ Erro:", error.response?.data || error.message);
  } finally {
    await prisma.$disconnect();
  }
}

syncUser();
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});
const GLPI_URL = process.env.GLPI_URL.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN;
const APP_TOKEN = process.env.GLPI_APP_TOKEN;
async function syncUser() {
    console.log("🚀 Iniciando captura de Usuário/Contato...");
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        const headers = { 'Session-Token': sessionRes.data.session_token, 'App-Token': APP_TOKEN };
        const serverName = "APPSIM01";
        const glpiId = 1389;
        console.log(`📡 Buscando dados de usuário para o ID ${glpiId}...`);
        const compRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}`, {
            params: { expand_dropdowns: true },
            headers
        });
        const compData = compRes.data;
        const userName = compData.users_id || "";
        const contactField = compData.contact || "";
        console.log(`✅ Usuário no GLPI: ${userName}`);
        console.log(`✅ Contato Técnico (Alternate): ${contactField}`);
        const dbComputer = await prisma.computer.findFirst({
            where: { hostname: { contains: serverName, mode: 'insensitive' } }
        });
        if (dbComputer) {
            await prisma.computer.update({
                where: { id: dbComputer.id },
                data: {
                    user: String(userName),
                    alternateUser: String(contactField)
                }
            });
            console.log(`💾 Banco atualizado: '${contactField}' salvo em alternateUser.`);
        }
        else {
            console.error(`❌ O computador ${serverName} não existe no banco local.`);
        }
    }
    catch (error) {
        console.error("❌ Erro:", error.response?.data || error.message);
    }
    finally {
        await prisma.$disconnect();
    }
}
syncUser();
//# sourceMappingURL=glpi-sync-user.js.map
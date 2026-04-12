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
async function syncOS() {
    console.log("🚀 Iniciando captura de Sistema Operacional...");
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        const headers = { 'Session-Token': sessionRes.data.session_token, 'App-Token': APP_TOKEN };
        const serverName = "APPSIM01";
        const glpiId = 1389;
        console.log(`📡 Buscando SO para o computador ID ${glpiId}...`);
        const osRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_OperatingSystem`, {
            params: { expand_dropdowns: true },
            headers
        });
        const osData = osRes.data?.[0];
        if (!osData) {
            console.warn("⚠️ Nenhum sistema operacional vinculado a este computador no GLPI.");
            return;
        }
        const osName = osData.operatingsystems_id || "";
        const osVersion = osData.operatingsystemversions_id || "";
        const osEdition = osData.operatingsystemeditions_id || "";
        const osArch = osData.operatingsystemarchitectures_id || "";
        const fullOSName = `${osName} ${osVersion} ${osEdition} (${osArch})`.replace(/\s+/g, ' ').trim();
        console.log(`✅ SO Detectado: ${fullOSName}`);
        const dbComputer = await prisma.computer.findFirst({
            where: { hostname: { contains: serverName, mode: 'insensitive' } }
        });
        if (dbComputer) {
            await prisma.computer.update({
                where: { id: dbComputer.id },
                data: {
                    osName: fullOSName,
                    osArch: osArch || null,
                    osVersion: osVersion || null
                }
            });
            console.log(`💾 Banco de dados atualizado para o servidor ${serverName}.`);
        }
    }
    catch (error) {
        console.error("❌ Erro:", error.response?.data || error.message);
    }
    finally {
        await prisma.$disconnect();
    }
}
syncOS();
//# sourceMappingURL=glpi-sync-os.js.map
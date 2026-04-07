import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const GLPI_URL = process.env.GLPI_URL.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN;
const APP_TOKEN = process.env.GLPI_APP_TOKEN;
async function syncSoftwaresDefinitivo() {
    console.log("🚀 Iniciando sincronização robusta...");
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        const sessionToken = sessionRes.data.session_token;
        const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };
        async function getSoftwareDetails(versionId) {
            try {
                const vRes = await axios.get(`${GLPI_URL}/SoftwareVersion/${versionId}`, { headers });
                const versionData = vRes.data;
                const sRes = await axios.get(`${GLPI_URL}/Software/${versionData.softwares_id}`, { headers });
                return {
                    softwareName: sRes.data.name,
                    versionName: versionData.name
                };
            }
            catch (e) {
                return null;
            }
        }
        const glpiId = 1389;
        const dbComputer = await prisma.computer.findFirst({ where: { glpiId } });
        if (!dbComputer)
            return console.error("❌ Computador local não encontrado.");
        const instRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_SoftwareVersion`, {
            params: { get_all_entities: 1 },
            headers
        });
        const installations = instRes.data;
        console.log(`📊 Processando ${installations.length} softwares...`);
        for (const inst of installations) {
            const vId = inst.softwareversions_id;
            const details = await getSoftwareDetails(vId);
            const finalName = details?.softwareName || `ID Software Desconhecido (${vId})`;
            const finalVersion = details?.versionName || "N/A";
            console.log(`📌 Gravando: ${finalName} | Versão: ${finalVersion}`);
            const software = await prisma.software.upsert({
                where: { glpiId: Number(inst.id) },
                update: { name: String(finalName), version: String(finalVersion) },
                create: { glpiId: Number(inst.id), name: String(finalName), version: String(finalVersion) },
            });
            await prisma.softwareOnComputer.upsert({
                where: { computerId_softwareId: { computerId: dbComputer.id, softwareId: software.id } },
                update: {},
                create: { computerId: dbComputer.id, softwareId: software.id },
            });
        }
        console.log("\n✅ Sincronização finalizada com busca profunda!");
    }
    catch (error) {
        console.error("❌ Erro fatal:", error.response?.data || error.message);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
syncSoftwaresDefinitivo();
//# sourceMappingURL=glpi-sync-softwares-name.js.map
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
async function syncSoftwares() {
    console.log("🚀 Iniciando sincronização de Softwares...");
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        const headers = { 'Session-Token': sessionRes.data.session_token, 'App-Token': APP_TOKEN };
        const serverName = "APPSIM01";
        const glpiId = 1389;
        const dbComputer = await prisma.computer.findFirst({
            where: { hostname: { contains: serverName, mode: 'insensitive' } }
        });
        if (!dbComputer) {
            console.error(`❌ Computador ${serverName} não encontrado no banco local. Sincronize o computador primeiro.`);
            return;
        }
        console.log(`📡 Buscando softwares para: ${dbComputer.hostname} (ID GLPI: ${glpiId})...`);
        const softRes = await axios.get(`${GLPI_URL}/Computer/${glpiId}/Item_SoftwareVersion`, {
            params: { expand_dropdowns: true, range: "0-1000" },
            headers
        });
        const rawSofts = softRes.data;
        if (!Array.isArray(rawSofts)) {
            console.warn("⚠️ Nenhum software retornado do GLPI.");
            return;
        }
        await prisma.softwareOnComputer.deleteMany({
            where: { computerId: dbComputer.id }
        });
        for (const s of rawSofts) {
            const softName = s.softwares_id ||
                s._software_name ||
                s.software_name ||
                "Desconhecido";
            const softVersion = s.name ||
                s.softwareversions_id ||
                s.version ||
                "N/A";
            const softPublisher = s.manufacturers_id ||
                s._manufacturer_name ||
                "N/A";
            const glpiSoftwareId = Number(s.id);
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
    }
    catch (error) {
        console.error("❌ Erro:", error.response?.data || error.message);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
syncSoftwares();
//# sourceMappingURL=glpi-sync-softwares.js.map
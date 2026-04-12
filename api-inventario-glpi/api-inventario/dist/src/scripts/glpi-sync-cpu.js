import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
import fs from 'fs';
import csv from 'csv-parser';
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const GLPI_URL = process.env.GLPI_URL.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN;
const APP_TOKEN = process.env.GLPI_APP_TOKEN;
async function getServerCsv() {
    const results = [];
    if (!fs.existsSync("server.csv"))
        return [];
    return new Promise((resolve, reject) => {
        fs.createReadStream("server.csv")
            .pipe(csv())
            .on("data", (data) => results.push({ id: Number(data.id), name: data.name.trim() }))
            .on("end", () => resolve(results))
            .on("error", reject);
    });
}
async function syncProcessorFinal() {
    console.log("🚀 Iniciando busca profunda de Processador...");
    const targets = await getServerCsv();
    let sessionToken = "";
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        sessionToken = sessionRes.data.session_token;
        for (const target of targets) {
            console.log(`\n📡 Lendo: ${target.name} (ID: ${target.id})`);
            let cpuLabel = "Não encontrado";
            try {
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_DeviceProcessor`, {
                    params: { expand_dropdowns: true },
                    headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
                });
                if (Array.isArray(res.data) && res.data.length > 0) {
                    cpuLabel = res.data[0].designation || res.data[0].name || cpuLabel;
                }
            }
            catch (e) { }
            if (cpuLabel === "Não encontrado") {
                try {
                    const resAlt = await axios.get(`${GLPI_URL}/Computer/${target.id}/DeviceProcessor`, {
                        params: { expand_dropdowns: true },
                        headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
                    });
                    if (Array.isArray(resAlt.data) && resAlt.data.length > 0) {
                        cpuLabel = resAlt.data[0].designation || resAlt.data[0].name || cpuLabel;
                    }
                }
                catch (e) { }
            }
            console.log(`✅ Resultado: ${cpuLabel}`);
            await prisma.computer.updateMany({
                where: { glpiId: target.id },
                data: { cpu: cpuLabel }
            });
        }
    }
    catch (error) {
        console.error("❌ Erro:", error.message);
    }
    finally {
        if (sessionToken) {
            await axios.get(`${GLPI_URL}/killSession`, {
                headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
            }).catch(() => null);
        }
        await prisma.$disconnect();
        await pool.end();
    }
}
syncProcessorFinal();
//# sourceMappingURL=glpi-sync-cpu.js.map
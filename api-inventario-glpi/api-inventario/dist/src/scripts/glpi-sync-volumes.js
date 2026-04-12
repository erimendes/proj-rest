import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
import fs from 'fs';
import csv from 'csv-parser';
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const GLPI_URL = process.env.GLPI_URL.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN;
const APP_TOKEN = process.env.GLPI_APP_TOKEN;
async function getServerCsv() {
    const results = [];
    const csvPath = "server.csv";
    if (!fs.existsSync(csvPath)) {
        console.error("❌ server.csv não encontrado!");
        return [];
    }
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (data) => {
            if (data.id && data.name) {
                results.push({
                    id: Number(data.id),
                    name: data.name.trim()
                });
            }
        })
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
}
async function syncAllVolumes() {
    console.log("🚀 Iniciando sincronização massiva de Volumes...");
    const targets = await getServerCsv();
    if (targets.length === 0)
        return;
    let sessionToken = "";
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        sessionToken = sessionRes.data.session_token;
        const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };
        for (const target of targets) {
            console.log(`\n📡 Processando: ${target.name} (GLPI ID: ${target.id})...`);
            let rawData = [];
            try {
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_Disk`, { headers });
                rawData = Array.isArray(res.data) ? res.data : [];
            }
            catch (e) {
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Computer_Item_Disk`, { headers }).catch(() => ({ data: [] }));
                rawData = Array.isArray(res.data) ? res.data : [];
            }
            const mappedVolumes = rawData.map((v) => {
                const rawSize = Number(v.totalsize || v.size || v.capacity || 0);
                const sizeGB = Number((rawSize / 1024).toFixed(2));
                return {
                    mountPoint: String(v.name || v.mountpoint || v.designation || "Disco"),
                    capacityGb: sizeGB,
                    glpiId: v.id ? Number(v.id) : null
                };
            }).filter(v => v.capacityGb > 0.1);
            if (mappedVolumes.length === 0) {
                console.log(`⚠️ Nenhum volume válido encontrado para ${target.name}.`);
                continue;
            }
            const dbComputer = await prisma.computer.findFirst({
                where: {
                    OR: [
                        { glpiId: target.id },
                        { hostname: { contains: target.name, mode: 'insensitive' } }
                    ]
                }
            });
            if (!dbComputer) {
                console.error(`❌ Computador ${target.name} não existe no banco local. Pulando...`);
                continue;
            }
            await prisma.volume.deleteMany({ where: { computerId: dbComputer.id } });
            await prisma.volume.createMany({
                data: mappedVolumes.map(v => ({
                    mountPoint: v.mountPoint,
                    capacityGb: v.capacityGb,
                    glpiId: v.glpiId,
                    computerId: dbComputer.id
                }))
            });
            const totalHd = mappedVolumes.reduce((acc, cur) => acc + cur.capacityGb, 0);
            const hdString = `${totalHd.toFixed(2)} GB`;
            await prisma.computer.update({
                where: { id: dbComputer.id },
                data: { hd: hdString }
            });
            console.log(`✅ ${target.name}: ${mappedVolumes.length} volumes sincronizados. Total: ${hdString}`);
        }
        console.log("\n✨ Sincronização finalizada com sucesso!");
    }
    catch (error) {
        console.error("❌ Erro fatal:", error.response?.data || error.message);
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
syncAllVolumes();
//# sourceMappingURL=glpi-sync-volumes.js.map
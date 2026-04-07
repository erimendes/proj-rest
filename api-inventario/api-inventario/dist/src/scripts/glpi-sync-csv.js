import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';
import { PrismaClient, ComputerType, ComputerRole } from '../generated/prisma/client.js';
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
        console.error("❌ server.csv não encontrado na raiz!");
        return [];
    }
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (data) => {
            const hostname = data.name?.trim();
            const glpiId = data.id?.trim();
            if (hostname) {
                results.push({ hostname, glpiId });
            }
        })
            .on("end", () => resolve(results))
            .on("error", reject);
    });
}
function parseVolumes(rawVolumes) {
    return rawVolumes
        .map((v) => {
        const rawSize = Number(v.size || v.totalsize || 0);
        let sizeGB = rawSize > 1_000_000 ? rawSize / 1024 / 1024 / 1024 : 0;
        if (rawSize > 0 && sizeGB === 0)
            sizeGB = rawSize / 1024 / 1024;
        return {
            mountPoint: String(v.mountpoint || v.name || "Disco"),
            capacityGb: Number(sizeGB.toFixed(2)),
            glpiId: v.id ? Number(v.id) : null
        };
    })
        .filter((d) => d.capacityGb > 0.1);
}
async function syncServers() {
    console.log("🚀 Iniciando sincronização baseada no server.csv (id, name)...");
    const targets = await getServerCsv();
    if (targets.length === 0) {
        console.warn("⚠️ Nenhuma linha válida encontrada no CSV. Verifique se o cabeçalho é 'id,name'");
        return;
    }
    let sessionToken = "";
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { Authorization: `user_token ${USER_TOKEN}`, "App-Token": APP_TOKEN }
        });
        sessionToken = sessionRes.data.session_token;
        const headers = { "Session-Token": sessionToken, "App-Token": APP_TOKEN };
        for (const target of targets) {
            console.log(`🔍 Processando: ${target.hostname} (GLPI ID: ${target.glpiId})`);
            try {
                const detailedRes = await axios.get(`${GLPI_URL}/Computer/${target.glpiId}`, {
                    params: { expand_dropdowns: true, get_full_details: true },
                    headers
                });
                const foundComp = detailedRes.data;
                const cpuItem = foundComp._devices?.find((d) => d.devicetype === "Processor") || foundComp.DeviceProcessor?.[0];
                const cpu = cpuItem?.designation || "N/A";
                const ramItems = foundComp._memories || foundComp.DeviceMemory || [];
                const ramMB = ramItems.reduce((acc, m) => acc + (parseInt(m.size) || 0), 0);
                const ram = ramMB > 0 ? `${(ramMB / 1024).toFixed(1)} GB` : "N/A";
                const drivesData = parseVolumes(foundComp._filesystems || foundComp.FileSystem || []);
                const totalHd = drivesData.reduce((acc, v) => acc + v.capacityGb, 0);
                const hdLabel = totalHd > 0 ? `${totalHd.toFixed(2)} GB` : "N/A";
                const computer = await prisma.computer.upsert({
                    where: { glpiId: Number(foundComp.id) },
                    update: {
                        hostname: foundComp.name,
                        cpu,
                        ram,
                        hd: hdLabel,
                        lastSync: new Date()
                    },
                    create: {
                        glpiId: Number(foundComp.id),
                        hostname: foundComp.name,
                        mainIp: foundComp.name,
                        cpu,
                        ram,
                        hd: hdLabel,
                        type: ComputerType.SERVER,
                        role: ComputerRole.SERVER
                    }
                });
                console.log(`✅ Sincronizado: ${foundComp.name}`);
            }
            catch (err) {
                console.error(`❌ Erro ao buscar detalhes do ID ${target.glpiId}:`, err.message);
            }
        }
    }
    catch (error) {
        console.error("❌ Erro de Sessão:", error.message);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
syncServers();
//# sourceMappingURL=glpi-sync-csv.js.map
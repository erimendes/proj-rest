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
async function syncRAMMassivo() {
    console.log("🚀 Iniciando captura massiva de Memória RAM...");
    const targets = await getServerCsv();
    if (targets.length === 0) {
        console.warn("⚠️ Nenhum servidor para processar.");
        return;
    }
    let sessionToken = "";
    try {
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        sessionToken = sessionRes.data.session_token;
        const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };
        for (const target of targets) {
            console.log(`\n📡 Buscando RAM para: ${target.name} (ID: ${target.id})...`);
            try {
                const ramRes = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_DeviceMemory`, {
                    headers
                });
                const ramItems = ramRes.data;
                let ramLabel = "N/A";
                if (Array.isArray(ramItems) && ramItems.length > 0) {
                    const totalRamMB = ramItems.reduce((acc, item) => {
                        return acc + (parseInt(item.size) || 0);
                    }, 0);
                    const totalRamGB = (totalRamMB / 1024).toFixed(1);
                    ramLabel = `${totalRamGB} GB`;
                    console.log(`✅ Detectado: ${ramLabel} (${ramItems.length} pentes)`);
                }
                else {
                    console.warn(`⚠️ Nenhuma RAM física encontrada para ${target.name}.`);
                }
                const updateResult = await prisma.computer.updateMany({
                    where: {
                        OR: [
                            { glpiId: target.id },
                            { hostname: { contains: target.name, mode: 'insensitive' } }
                        ]
                    },
                    data: { ram: ramLabel }
                });
                if (updateResult.count > 0) {
                    console.log(`💾 Banco atualizado para ${target.name}.`);
                }
                else {
                    console.error(`❌ Servidor ${target.name} não localizado no banco local.`);
                }
            }
            catch (itemError) {
                console.error(`❌ Erro ao processar ID ${target.id}:`, itemError.message);
            }
        }
        console.log("\n✨ Sincronização de RAM finalizada!");
    }
    catch (error) {
        console.error("❌ Erro fatal de conexão:", error.response?.data || error.message);
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
syncRAMMassivo();
//# sourceMappingURL=glpi-sync-ram.js.map
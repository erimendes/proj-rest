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

const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

// --- FUNÇÃO PARA LER O CSV ---
// --- FUNÇÃO PARA LER O CSV CORRIGIDA ---
async function getServerCsv(): Promise<{ id: number, name: string }[]> {
    // Definimos explicitamente o tipo do array para evitar o erro de 'never[]'
    const results: { id: number, name: string }[] = []; 
    const csvPath = "server.csv";

    if (!fs.existsSync(csvPath)) {
        console.error("❌ server.csv não encontrado!");
        return [];
    }

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (data) => {
                // Verificamos se os campos existem antes de adicionar
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
    if (targets.length === 0) return;

    let sessionToken = "";

    try {
        // 1. Iniciar Sessão
        const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
            headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
        });
        sessionToken = sessionRes.data.session_token;
        const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };

        for (const target of targets) {
            console.log(`\n📡 Processando: ${target.name} (GLPI ID: ${target.id})...`);

            // 2. Tentar buscar discos/volumes
            let rawData: any[] = []; // Definimos explicitamente que é um array de qualquer coisa
            try {
                // Tentativa A: Item_Disk (Volumes Lógicos/Partições)
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_Disk`, { headers });
                rawData = Array.isArray(res.data) ? res.data : [];
            } catch (e) {
                // Tentativa B: Computer_Item_Disk (Fallback)
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Computer_Item_Disk`, { headers }).catch(() => ({ data: [] }));
                rawData = Array.isArray(res.data) ? res.data : [];
            }

            // 3. Mapear e Converter
            const mappedVolumes = rawData.map((v: any) => {
                // O GLPI costuma enviar em MB. Tentamos encontrar o campo de tamanho:
                const rawSize = Number(v.totalsize || v.size || v.capacity || 0);
                const sizeGB = Number((rawSize / 1024).toFixed(2));

                return {
                    mountPoint: String(v.name || v.mountpoint || v.designation || "Disco"),
                    capacityGb: sizeGB,
                    glpiId: v.id ? Number(v.id) : null
                };
            }).filter(v => v.capacityGb > 0.1); // Ignora discos "vazios" ou erros de leitura

            if (mappedVolumes.length === 0) {
                console.log(`⚠️ Nenhum volume válido encontrado para ${target.name}.`);
                continue;
            }

            // 4. Buscar Computador no Banco Local pelo glpiId ou Nome
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

            // 5. Limpar volumes antigos e gravar novos (Transação manual)
            await prisma.volume.deleteMany({ where: { computerId: dbComputer.id } });
            
            await prisma.volume.createMany({
                data: mappedVolumes.map(v => ({
                    mountPoint: v.mountPoint,
                    capacityGb: v.capacityGb,
                    glpiId: v.glpiId,
                    computerId: dbComputer.id
                }))
            });

            // 6. Atualizar campo 'hd' (string) no Computador com a soma total
            const totalHd = mappedVolumes.reduce((acc, cur) => acc + cur.capacityGb, 0);
            const hdString = `${totalHd.toFixed(2)} GB`;

            await prisma.computer.update({
                where: { id: dbComputer.id },
                data: { hd: hdString }
            });

            console.log(`✅ ${target.name}: ${mappedVolumes.length} volumes sincronizados. Total: ${hdString}`);
        }

        console.log("\n✨ Sincronização finalizada com sucesso!");

    } catch (error: any) {
        console.error("❌ Erro fatal:", error.response?.data || error.message);
    } finally {
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
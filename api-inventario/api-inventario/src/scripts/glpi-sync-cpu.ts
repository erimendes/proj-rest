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

const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

async function getServerCsv(): Promise<{ id: number, name: string }[]> {
    const results: { id: number, name: string }[] = [];
    if (!fs.existsSync("server.csv")) return [];
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

            // TENTATIVA 1: Endpoint Padrão de Componentes
            try {
                const res = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_DeviceProcessor`, {
                    params: { expand_dropdowns: true },
                    headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
                });

                if (Array.isArray(res.data) && res.data.length > 0) {
                    cpuLabel = res.data[0].designation || res.data[0].name || cpuLabel;
                }
            } catch (e) { /* continua para tentativa 2 */ }

            // TENTATIVA 2: Se não achou, busca nos Dispositivos Gerais (comum em versões antigas/específicas)
            if (cpuLabel === "Não encontrado") {
                try {
                    const resAlt = await axios.get(`${GLPI_URL}/Computer/${target.id}/DeviceProcessor`, {
                        params: { expand_dropdowns: true },
                        headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN }
                    });
                    if (Array.isArray(resAlt.data) && resAlt.data.length > 0) {
                        cpuLabel = resAlt.data[0].designation || resAlt.data[0].name || cpuLabel;
                    }
                } catch (e) { /* falha total */ }
            }

            console.log(`✅ Resultado: ${cpuLabel}`);

            // Gravar no Banco
            await prisma.computer.updateMany({
                where: { glpiId: target.id },
                data: { cpu: cpuLabel }
            });
        }
    } catch (error: any) {
        console.error("❌ Erro:", error.message);
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

syncProcessorFinal();



// import "dotenv/config";
// import { PrismaClient } from '../generated/prisma/client.js';
// import { PrismaPg } from "@prisma/adapter-pg";
// import axios from "axios";
// import fs from 'fs';
// import csv from 'csv-parser';
// import pg from "pg";

// const { Pool } = pg;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });

// const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
// const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
// const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

// // --- 1. FUNÇÃO PARA LER O CSV COM TIPAGEM CORRETA ---
// async function getServerCsv(): Promise<{ id: number, name: string }[]> {
//     const results: { id: number, name: string }[] = [];
//     const csvPath = "server.csv";

//     if (!fs.existsSync(csvPath)) {
//         console.error("❌ server.csv não encontrado na raiz do projeto!");
//         return [];
//     }

//     return new Promise((resolve, reject) => {
//         fs.createReadStream(csvPath)
//             .pipe(csv())
//             .on("data", (data) => {
//                 if (data.id && data.name) {
//                     results.push({
//                         id: Number(data.id),
//                         name: data.name.trim()
//                     });
//                 }
//             })
//             .on("end", () => resolve(results))
//             .on("error", (err) => reject(err));
//     });
// }

// // --- 2. FUNÇÃO PRINCIPAL DE SINCRONIZAÇÃO DE CPU ---
// async function syncCPUMassivo() {
//     console.log("🚀 Iniciando captura massiva de Processadores (CPU)...");

//     const targets = await getServerCsv();
//     if (targets.length === 0) {
//         console.warn("⚠️ Nenhum servidor encontrado para processar.");
//         return;
//     }

//     let sessionToken = "";

//     try {
//         // Login no GLPI
//         const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
//             headers: { 'Authorization': `user_token ${USER_TOKEN}`, 'App-Token': APP_TOKEN }
//         });
//         sessionToken = sessionRes.data.session_token;
//         const headers = { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN };

//         for (const target of targets) {
//             console.log(`\n📡 Buscando CPU para: ${target.name} (ID: ${target.id})...`);

//             try {
//                 // Busca componentes de processador no GLPI (Item_DeviceProcessor)
//                 const cpuRes = await axios.get(`${GLPI_URL}/Computer/${target.id}/Item_DeviceProcessor`, {
//                     headers
//                 });

//                 const cpuItems = cpuRes.data;
//                 let cpuLabel = "N/A";

//                 if (Array.isArray(cpuItems) && cpuItems.length > 0) {
//                     // Extração dos dados do primeiro processador encontrado
//                     const cpuModel = cpuItems[0].designation || cpuItems[0].name || "Processador Desconhecido";
//                     const cpuCount = cpuItems.length;
//                     const coreCount = cpuItems[0].nbcores || "";

//                     // Formata a string amigável
//                     cpuLabel = `${cpuCount}x ${cpuModel} ${coreCount ? `(${coreCount} cores)` : ""}`.trim();
//                     console.log(`✅ Detectado: ${cpuLabel}`);
//                 } else {
//                     console.warn(`⚠️ Nenhum processador físico encontrado para ${target.name}.`);
//                 }

//                 // Update no Banco de Dados local
//                 const updateResult = await prisma.computer.updateMany({
//                     where: {
//                         OR: [
//                             { glpiId: target.id },
//                             { hostname: { contains: target.name, mode: 'insensitive' } }
//                         ]
//                     },
//                     data: { cpu: cpuLabel }
//                 });

//                 if (updateResult.count > 0) {
//                     console.log(`💾 Banco atualizado para ${target.name}.`);
//                 } else {
//                     console.error(`❌ Servidor ${target.name} não localizado no banco local para atualização.`);
//                 }

//             } catch (itemError: any) {
//                 console.error(`❌ Erro ao processar dados de CPU do ID ${target.id}:`, itemError.message);
//             }
//         }

//         console.log("\n✨ Sincronização de CPU finalizada!");

//     } catch (error: any) {
//         console.error("❌ Erro fatal de conexão:", error.response?.data || error.message);
//     } finally {
//         if (sessionToken) {
//             await axios.get(`${GLPI_URL}/killSession`, { 
//                 headers: { 'Session-Token': sessionToken, 'App-Token': APP_TOKEN } 
//             }).catch(() => null);
//         }
//         await prisma.$disconnect();
//         await pool.end();
//     }
// }

// syncCPUMassivo();
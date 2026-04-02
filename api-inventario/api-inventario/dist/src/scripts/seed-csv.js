import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ComputerType, ComputerRole } from "../generated/prisma/client.js";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function seedFromCSV() {
    const csvPath = 'dados_iniciais.csv';
    if (!fs.existsSync(csvPath)) {
        console.error('❌ Arquivo dados_iniciais.csv não encontrado na raiz!');
        return;
    }
    console.log('🚀 Iniciando leitura do CSV...');
    const results = [];
    fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
        for (const row of results) {
            try {
                const mainIp = row.mainIp?.trim();
                const hostname = row.hostname?.trim() || mainIp;
                const hostFisico = row.hostFisico?.trim() || hostname;
                const nameHaperv = row.nameHaperv?.trim() || hostname;
                if (!mainIp) {
                    console.warn(`⚠️ Pulando registro sem mainIp: ${JSON.stringify(row)}`);
                    continue;
                }
                const tipoStr = row.tipo?.toLowerCase() || '';
                let type = ComputerType.DESKTOP;
                if (tipoStr.includes('server'))
                    type = ComputerType.SERVER;
                else if (tipoStr.includes('notebook'))
                    type = ComputerType.NOTEBOOK;
                else if (row.VM?.toLowerCase() === 'sim' || row.fabricante?.toLowerCase().includes('virtual'))
                    type = ComputerType.VM;
                const role = (type === ComputerType.SERVER || type === ComputerType.VM)
                    ? ComputerRole.SERVER
                    : ComputerRole.USER;
                await prisma.computer.upsert({
                    where: { mainIp: row.mainIp },
                    update: {
                        hostname: row.hostname,
                        hostFisico: hostFisico,
                        nameHaperv: nameHaperv,
                        manufacturer: row.fabricante || 'Unknown',
                        modelName: row.modelo || 'Unknown',
                        osName: row['sistema operacional'] || 'Unknown',
                        cpu: row.cpu || 'Unknown',
                        ram: row.ram || 'Unknown',
                        hd: row.hd || 'Unknown',
                        type,
                        role,
                        lastSync: new Date()
                    },
                    create: {
                        mainIp: row.mainIp,
                        hostname: row.hostname,
                        hostFisico: hostFisico,
                        nameHaperv: nameHaperv,
                        manufacturer: row.fabricante || 'Unknown',
                        modelName: row.modelo || 'Unknown',
                        osName: row['sistema operacional'] || 'Unknown',
                        cpu: row.cpu || 'Unknown',
                        ram: row.ram || 'Unknown',
                        hd: row.hd || 'Unknown',
                        type,
                        role
                    }
                });
                console.log(`✅ Processado: ${hostname} (${mainIp})`);
            }
            catch (err) {
                console.error(`❌ Erro no registro ${row.mainIp}:`, err.message);
            }
        }
        console.log('🏁 Importação concluída!');
        await prisma.$disconnect();
        await pool.end();
    });
}
seedFromCSV().catch(err => console.error("Erro fatal no seed:", err));
//# sourceMappingURL=seed-csv.js.map
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import fs from 'fs';
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function exportComputersToCsv() {
    console.log("📡 Extraindo dados da tabela 'computer' para CSV (Separador: ;)...");
    try {
        const computers = await prisma.computer.findMany({
            select: {
                hostname: true,
                mainIp: true,
                cpu: true,
                ram: true,
                hd: true
            },
            orderBy: {
                hostname: 'asc'
            }
        });
        if (computers.length === 0) {
            console.warn("⚠️ A tabela 'computer' está vazia.");
            return;
        }
        const header = "hostname;mainIp;cpu;ram;hd\n";
        const rows = computers.map(c => {
            const hostname = (c.hostname || "").replace(/;/g, " ");
            const mainIp = (c.mainIp || "").replace(/;/g, " ");
            const cpu = (c.cpu || "N/A").replace(/;/g, " ");
            const ram = (c.ram || "N/A").replace(/;/g, " ");
            const hd = (c.hd || "N/A").replace(/;/g, " ");
            return `${hostname};${mainIp};${cpu};${ram};${hd}`;
        }).join("\n");
        const csvContent = header + rows;
        const fileName = "export_inventory.csv";
        fs.writeFileSync(fileName, csvContent, 'utf-8');
        console.log(`---`);
        console.log(`✅ Sucesso! ${computers.length} registros exportados.`);
        console.log(`📂 Arquivo gerado: ${fileName}`);
        console.log(`📌 Separador utilizado: ponto e vírgula (;)`);
        console.log(`---`);
    }
    catch (error) {
        console.error("❌ Erro ao exportar dados:", error.message);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
exportComputersToCsv();
//# sourceMappingURL=glpi-sync-gerar-csv.js.map
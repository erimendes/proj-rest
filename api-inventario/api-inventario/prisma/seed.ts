// prisma/seed.ts
import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js"; // Ajuste conforme seu caminho de saída

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de Departamentos...');

  // 1. Criar o departamento de TI
  const tiDept = await prisma.department.upsert({
    where: { name: "Tecnologia da Informação" },
    update: {},
    create: {
      id: 1, // Forçamos o ID 1 para bater com seus testes
      name: "Tecnologia da Informação",
    },
  });

  // 2. Criar o departamento de RH (Opcional, para teste)
  const rhDept = await prisma.department.upsert({
    where: { name: "Recursos Humanos" },
    update: {},
    create: {
      id: 2,
      name: "Recursos Humanos",
    },
  });

  console.log('✅ Departamentos garantidos:', { tiDept, rhDept });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });

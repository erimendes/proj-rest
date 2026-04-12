import "dotenv/config";
import axios from 'axios';
import fs from 'fs';

// Configurações do .env
const GLPI_URL = process.env.GLPI_URL!.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN!;
const APP_TOKEN = process.env.GLPI_APP_TOKEN!;

async function exportNamesToCsv() {
  console.log("📡 Conectando ao GLPI para extrair nomes...");

  try {
    // 1. Iniciar Sessão
    const sessionRes = await axios.get(`${GLPI_URL}/initSession`, {
      headers: {
        Authorization: `user_token ${USER_TOKEN}`,
        "App-Token": APP_TOKEN
      }
    });

    const sessionToken = sessionRes.data.session_token;
    const headers = {
      "Session-Token": sessionToken,
      "App-Token": APP_TOKEN
    };

    // 2. Buscar Computadores (Pegando de todas as entidades)
    // Usamos um range grande para garantir que pegamos todos os ativos
    const response = await axios.get(`${GLPI_URL}/Computer`, {
      params: {
        range: "0-5000",
        get_all_entities: 1, 
      },
      headers
    });

    if (Array.isArray(response.data)) {
      const computers = response.data;
      
      // 3. Preparar o conteúdo do CSV
      // Cabeçalho do CSV
      let csvContent = "id,name\n"; 

      computers.forEach((c: any) => {
        // Limpamos o nome de possíveis vírgulas para não quebrar o CSV
        const safeName = c.name ? c.name.replace(/,/g, "") : "SEM_NOME";
        csvContent += `${c.id},${safeName}\n`;
      });

      // 4. Salvar o arquivo
      const fileName = "glpi_names.csv";
      fs.writeFileSync(fileName, csvContent, 'utf-8');

      console.log(`---`);
      console.log(`✅ Sucesso! ${computers.length} nomes exportados.`);
      console.log(`📂 Arquivo gerado: ${fileName}`);
      console.log(`---`);

    } else {
      console.warn("⚠️ A API não retornou uma lista de computadores.");
    }

    // 5. Encerrar Sessão
    await axios.get(`${GLPI_URL}/killSession`, { headers });

  } catch (error: any) {
    console.error("❌ Erro na exportação:", error.response?.data || error.message);
  }
}

exportNamesToCsv();
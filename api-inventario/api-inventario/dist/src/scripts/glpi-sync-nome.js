import "dotenv/config";
import axios from 'axios';
import fs from 'fs';
const GLPI_URL = process.env.GLPI_URL.replace(/\/$/, "");
const USER_TOKEN = process.env.GLPI_USER_TOKEN;
const APP_TOKEN = process.env.GLPI_APP_TOKEN;
async function exportNamesToCsv() {
    console.log("📡 Conectando ao GLPI para extrair nomes...");
    try {
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
        const response = await axios.get(`${GLPI_URL}/Computer`, {
            params: {
                range: "0-5000",
                get_all_entities: 1,
            },
            headers
        });
        if (Array.isArray(response.data)) {
            const computers = response.data;
            let csvContent = "id,name\n";
            computers.forEach((c) => {
                const safeName = c.name ? c.name.replace(/,/g, "") : "SEM_NOME";
                csvContent += `${c.id},${safeName}\n`;
            });
            const fileName = "glpi_names.csv";
            fs.writeFileSync(fileName, csvContent, 'utf-8');
            console.log(`---`);
            console.log(`✅ Sucesso! ${computers.length} nomes exportados.`);
            console.log(`📂 Arquivo gerado: ${fileName}`);
            console.log(`---`);
        }
        else {
            console.warn("⚠️ A API não retornou uma lista de computadores.");
        }
        await axios.get(`${GLPI_URL}/killSession`, { headers });
    }
    catch (error) {
        console.error("❌ Erro na exportação:", error.response?.data || error.message);
    }
}
exportNamesToCsv();
//# sourceMappingURL=glpi-sync-nome.js.map
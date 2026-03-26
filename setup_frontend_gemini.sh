#!/bin/bash

PROJECT_NAME="restaurante-web"

echo "🚀 Iniciando limpeza profunda..."
rm -rf $PROJECT_NAME

echo "📦 Criando projeto Vite (Forçando modo silencioso)..."

# O 'printf "\n"' simula o apertar de ENTER nas perguntas do Vite
# O '--' separa os argumentos do npx dos argumentos do create-vite
printf "\n" | npx create-vite@latest $PROJECT_NAME --template react-ts

cd $PROJECT_NAME || exit

echo "📥 Instalando dependências (Aguarde...)"
# Instalamos tudo de uma vez para ganhar tempo
npm install --silent
npm install -D tailwindcss postcss autoprefixer --silent
npx tailwindcss init -p
npm install axios lucide-react --silent

echo "🧹 Removendo lixo e configurando arquivos..."
rm -rf src/*
mkdir -p src/services

# --- CONFIGURAÇÃO TAILWIND ---
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
EOF

cat > src/index.css <<EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# --- API SERVICE ---
cat > src/services/api.ts <<EOF
import axios from 'axios';
export const api = axios.create({ baseURL: '' });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Restaurante:token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});
EOF

# --- APP COMPONENT ---
cat > src/App.tsx <<EOF
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { ChefHat, Clock } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchQueue = () => {
      api.get('/orders/kitchen/queue')
        .then(res => setItems(res.data))
        .catch(err => console.error("Erro na API:", err));
    };
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-4">
        <ChefHat size={40} className="text-orange-500" />
        <h1 className="text-3xl font-bold">Monitor da Cozinha</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-20 italic">
            Aguardando novos pedidos...
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-slate-800 border-l-4 border-orange-500 p-5 rounded-r-lg shadow-2xl">
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl font-black italic">Mesa {item.tableNumber}</span>
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-tighter">
                  {item.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">{item.quantity}x {item.productName}</h3>
              {item.observation && (
                <div className="mt-3 text-sm bg-amber-900/30 text-amber-200 p-3 rounded border border-amber-500/10 italic">
                  "{item.observation}"
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-500 text-xs mt-6 pt-4 border-t border-slate-700/50">
                <Clock size={14} />
                <span>Acabou de chegar</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
EOF

# --- MAIN ENTRY ---
cat > src/main.tsx <<EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# --- VITE CONFIG ---
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/orders': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
EOF

echo -e "\n---"
echo "✅ FRONTEND CONFIGURADO COM SUCESSO!"
echo "🚀 Agora execute os comandos abaixo:"
echo "cd $PROJECT_NAME"
echo "npm run dev"
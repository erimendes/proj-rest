#!/bin/bash

PROJECT_NAME="restaurante-web"

echo "🚀 Atualizando Frontend para KDS Interativo..."

cd $PROJECT_NAME || { echo "❌ Pasta $PROJECT_NAME não encontrada!"; exit 1; }

# --- 1. ATUALIZANDO O APP.TSX COM BOTÃO DE FINALIZAR ---
cat > src/App.tsx <<EOF
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { ChefHat, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<any[]>([]);

  const fetchQueue = () => {
    api.get('/orders/kitchen/queue')
      .then(res => setItems(res.data))
      .catch(err => console.error("Erro na API:", err));
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFinish = async (orderId: string) => {
    try {
      // Chamada para o backend mudar o status do pedido para READY
      await api.patch(\`/orders/\${orderId}/status\`, { status: 'READY' });
      
      // Remove da tela local imediatamente para dar sensação de velocidade
      setItems(prev => prev.filter(item => item.orderId !== orderId));
      
      console.log("✅ Pedido " + orderId + " finalizado!");
    } catch (err) {
      console.error("Erro ao finalizar:", err);
      alert("Não foi possível finalizar o pedido. Verifique o backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <ChefHat size={40} className="text-orange-500" />
          <h1 className="text-3xl font-bold tracking-tight">Cozinha em Tempo Real</h1>
        </div>
        <div className="text-slate-400 text-sm font-mono">
          {items.length} PEDIDOS PENDENTES
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-20">
             <CheckCircle2 size={80} />
             <p className="text-xl mt-4 italic">Tudo limpo por aqui!</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-slate-800 border-l-8 border-orange-500 p-5 rounded-r-xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-4xl font-black text-white">Mesa {item.tableNumber}</span>
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Status</span>
                     <span className="text-orange-400 text-xs font-bold">{item.status}</span>
                  </div>
                </div>

                <div className="py-4 border-y border-slate-700/50">
                  <h3 className="text-2xl font-bold text-slate-100 leading-tight">
                    {item.quantity}x <span className="text-orange-100">{item.productName}</span>
                  </h3>
                  {item.observation && (
                    <p className="mt-3 text-sm bg-red-900/20 text-red-200 p-3 rounded-lg border border-red-500/20 italic font-medium">
                      ⚠️ "{item.observation}"
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => handleFinish(item.orderId || item.id)}
                  className="w-full bg-green-600 hover:bg-green-500 active:scale-95 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                >
                  <CheckCircle2 size={20} />
                  PRONTO
                </button>
                
                <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-4 justify-center uppercase tracking-widest">
                  <Clock size={12} />
                  <span>Entrou na fila agora</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
EOF

# --- 2. ATUALIZANDO VITE.CONFIG PARA SUPORTAR PATCH ---
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

echo "✅ FRONTEND ATUALIZADO COM SUCESSO!"
echo "⚠️ Lembre-se: Você precisa ter a rota PATCH /orders/:id/status no seu NestJS!"
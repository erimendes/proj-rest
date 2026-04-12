#!/bin/bash

PROJECT_NAME="restaurante-web"
cd $PROJECT_NAME || exit

echo "🔔 Adicionando efeitos sonoros e corrigindo IDs..."

cat > src/App.tsx <<EOF
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { ChefHat, Clock, CheckCircle2, Bell } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<any[]>([]);

  // Carrega o som de um sininho (URL pública de exemplo)
  const playDing = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
  };

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
    if (!orderId) {
      alert("Erro: ID do pedido não encontrado no card.");
      return;
    }

    try {
      // 1. Toca o som primeiro para dar feedback imediato
      playDing();

      // 2. Avisa o backend
      await api.patch(\`/orders/\${orderId}/status\`, { status: 'READY' });
      
      // 3. Remove da tela
      setItems(prev => prev.filter(item => item.orderId !== orderId));
      
      console.log("✅ Pedido " + orderId + " enviado para entrega!");
    } catch (err) {
      console.error("Erro ao finalizar:", err);
      alert("Erro ao comunicar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <ChefHat size={40} className="text-orange-500" />
          <h1 className="text-3xl font-bold tracking-tight">Cozinha Digital</h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <Bell size={18} className="text-orange-400 animate-pulse" />
          <span className="text-orange-100 font-mono font-bold">{items.length} NA FILA</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-32 opacity-20">
             <CheckCircle2 size={100} strokeWidth={1} />
             <p className="text-2xl mt-4 italic font-light tracking-widest uppercase">Cozinha Limpa</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-slate-800 border-t-8 border-orange-600 p-6 rounded-xl shadow-2xl flex flex-col justify-between transform transition-all hover:scale-[1.02]">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-5xl font-black text-white italic tracking-tighter"># {item.tableNumber || '?'}</span>
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-md text-[10px] font-black border border-orange-500/20">
                    {item.status}
                  </span>
                </div>

                <div className="py-6 border-y border-slate-700/40">
                  <h3 className="text-3xl font-bold text-slate-100 leading-none mb-1">
                    {item.quantity}x
                  </h3>
                  <p className="text-xl font-medium text-slate-300">{item.productName}</p>
                  
                  {item.observation && (
                    <div className="mt-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-red-400 text-sm font-bold uppercase text-[10px] mb-1">Observação:</p>
                      <p className="text-red-100 text-sm italic">"{item.observation}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => handleFinish(item.orderId)}
                  className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/40 text-xl"
                >
                  <CheckCircle2 size={24} />
                  CONCLUÍDO
                </button>
                
                <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-4 justify-center font-bold tracking-[0.2em]">
                  <Clock size={12} />
                  <span>AGUARDANDO</span>
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

echo "✅ Frontend atualizado com som de 'Ding'!"
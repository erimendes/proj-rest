#!/bin/bash

PROJECT_NAME="restaurante-web"

# Verifica se está na pasta correta
if [ -d "$PROJECT_NAME" ]; then
    cd $PROJECT_NAME
else
    echo "❌ Pasta $PROJECT_NAME não encontrada. Execute este script na pasta raiz do projeto."
    exit 1
fi

echo "📂 Criando estrutura de pastas..."
mkdir -p src/views
mkdir -p src/services
mkdir -p srv/components
mkdir -p srv/hooks

echo "🎨 Atualizando App.tsx (Navegação Central)..."
cat > src/App.tsx <<EOF
import { useState } from 'react';
import { ChefHat, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import KitchenView from './views/KitchenView';
import TablesView from './views/TablesView';

export default function App() {
  const [currentView, setCurrentView] = useState<'tables' | 'kitchen'>('tables');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex font-sans">
      {/* Sidebar Lateral */}
      <aside className="w-20 md:w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <UtensilsCrossed className="text-orange-500" size={28} />
          <span className="hidden md:block font-black text-xl tracking-tighter italic text-orange-500">REST-OS</span>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <button 
            onClick={() => setCurrentView('tables')}
            className={\`w-full flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl transition-all \${
              currentView === 'tables' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'
            }\`}
          >
            <LayoutDashboard size={24} />
            <span className="hidden md:block font-bold">Mapa de Mesas</span>
          </button>

          <button 
            onClick={() => setCurrentView('kitchen')}
            className={\`w-full flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl transition-all \${
              currentView === 'kitchen' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'
            }\`}
          >
            <ChefHat size={24} />
            <span className="hidden md:block font-bold">Cozinha (KDS)</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
           <div className="bg-slate-900 p-3 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="hidden md:block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Servidor Online</span>
           </div>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 h-screen overflow-auto bg-slate-900">
        {currentView === 'tables' ? <TablesView /> : <KitchenView />}
      </main>
    </div>
  );
}
EOF

echo "🍳 Atualizando KitchenView.tsx..."
cat > src/views/KitchenView.tsx <<EOF
import { useKitchen } from '../hooks/useKitchen';
import { KitchenCard } from '../components/KitchenCard';
import { ChefHat, Loader2 } from 'lucide-react';

export default function KitchenView() {
  const { items, tables, loading, handleFinishItem } = useKitchen();

  if (loading && items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-orange-500 italic">
        <Loader2 className="animate-spin mr-2" /> Aquecendo a cozinha...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      {/* Header do Monitor */}
      <div className="flex justify-between items-center mb-12 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
            <ChefHat size={60} className="text-orange-600" />
            Monitor KDS
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Fila de Produção Realtime</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center">
            <span className="text-orange-500 text-4xl font-black italic">{items.length}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Itens Pendentes</span>
          </div>
        </div>
      </div>

      {/* Grid de Pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => {
          // Tradução do tableNumber (ID) para o número real da mesa
          const tableInfo = tables.find(t => t.id === item.tableNumber || t.id === item.order?.tableId);
          const displayTable = tableInfo ? tableInfo.number : "??";

          return (
            <KitchenCard 
              key={item.id}
              item={item}
              tableNumber={displayTable}
              onFinish={handleFinishItem}
            />
          );
        })}
      </div>

      {/* Estado Vazio */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-800">
          <ChefHat size={120} strokeWidth={1} className="opacity-10 mb-6" />
          <p className="text-3xl font-black italic uppercase tracking-[0.2em]">Cozinha sem pedidos</p>
          <p className="text-slate-600 font-bold mt-2">Tudo em dia por aqui!</p>
        </div>
      )}
    </div>
  );
}
EOF

echo "🪑 Atualizando TablesView.tsx..."
cat > src/views/TablesView.tsx <<EOF
import { useTables } from '../hooks/useTables';
import { TableModal } from '../components/TableModal';
import { Users, PlusCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function TablesView() {
  const { 
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder 
  } = useTables();

  if (loading && tables.length === 0) return <div className="flex h-screen items-center justify-center bg-slate-900 text-white italic"><Loader2 className="animate-spin mr-2" /> Sincronizando...</div>;

  return (
    <div className="p-8 w-full min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mapa de Mesas</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 italic">Gerenciamento de Salão</p>
        </div>
        
        <button 
          onClick={() => { 
            const num = prompt("Número da nova mesa:"); 
            if(num) api.post('/tables', { number: Number(num) }).then(() => { alert(`Mesa ${num} criada!`); loadTables(); }); 
          }} 
          className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
        >
          <PlusCircle size={24} /> NOVA MESA
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start"> 
        {tables.map((table) => (
          <button 
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`w-44 h-44 rounded-[3rem] flex flex-col items-center justify-center border-b-8 transition-all active:scale-95 shadow-2xl relative group ${
              table.status === 'FREE' 
              ? 'bg-emerald-500/10 border-emerald-600 text-emerald-500 hover:bg-emerald-500/20' 
              : 'bg-rose-500/10 border-rose-600 text-rose-500 hover:bg-rose-500/20'
            }`}
          >
            <span className="text-xs font-black uppercase opacity-40 tracking-widest">Mesa</span>
            <span className="text-7xl font-black leading-none">{table.number}</span>
            <div className="flex items-center gap-1 mt-2 bg-black/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
              <Users size={12} /> {table.status}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <TableModal 
        table={selectedTable}
        mode={viewMode}
        setMode={setViewMode}
        products={products}
        bill={billDetails}
        onClose={closeModal}
        onRefresh={loadTables}
        actions={{
          openTable: handleOpenTable,
          addItem: handleAddItem,
          viewBill: handleViewBill,
          closeOrder: handleCloseOrder
        }}
      />
    </div>
  );
}
EOF

echo "🪑 Atualizando TableModal.tsx..."
cat > src/components/TableModal.tsx <<EOF
import { X, Trash2, ShoppingCart, Utensils, Receipt, AlertTriangle, PlusCircle } from 'lucide-react';
import { api } from '../services/api';

interface TableModalProps {
  table: any;
  mode: 'OPTIONS' | 'MENU' | 'BILL';
  setMode: (mode: 'OPTIONS' | 'MENU' | 'BILL') => void;
  products: any[];
  bill: any;
  onClose: () => void;
  onRefresh: () => void;
  actions: {
    openTable: () => void;
    addItem: (id: string) => void;
    viewBill: () => void;
    closeOrder: () => void;
  };
}

export function TableModal({ table, mode, setMode, products, bill, onClose, onRefresh, actions }: TableModalProps) {
  if (!table) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 text-white">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-black italic text-orange-500 uppercase">Mesa {table.number}</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Gestão de Atendimento</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { if(confirm("Apagar mesa?")) api.delete(`/tables/${table.id}`).then(() => { onRefresh(); onClose(); }); }} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-full"><Trash2 /></button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors"><X size={32}/></button>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {mode === 'MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <button key={p.id} onClick={() => actions.addItem(p.id)} className="bg-slate-900/40 hover:bg-orange-600 p-6 rounded-3xl flex justify-between items-center transition-all group border border-white/5 text-left">
                  <div>
                    <p className="font-bold text-xl">{p.name}</p>
                    <p className="text-orange-500 group-hover:text-white font-black italic font-mono">R$ {Number(p.price).toFixed(2)}</p>
                  </div>
                  <ShoppingCart className="text-emerald-500 group-hover:text-white" />
                </button>
              ))}
              <button onClick={() => setMode('OPTIONS')} className="sm:col-span-2 py-4 text-slate-500 underline font-bold uppercase text-xs">Voltar</button>
            </div>
          )}

          {mode === 'BILL' && (
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5 space-y-3">
                {bill?.items.map((i: any) => (
                  <div key={i.id} className="flex justify-between italic text-slate-300">
                    <span>{i.quantity}x {i.product?.name}</span>
                    <b className="text-white font-mono">R$ {(i.unitPrice * i.quantity).toFixed(2)}</b>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-end border-t border-dashed border-slate-700">
                  <span className="font-black text-slate-500 uppercase italic">Total Geral</span>
                  <span className="text-5xl font-black text-emerald-500 italic font-mono">R$ {bill.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setMode('OPTIONS')} className="flex-1 bg-slate-700 py-5 rounded-2xl font-bold uppercase">Voltar</button>
                <button onClick={actions.closeOrder} className="flex-[2] bg-emerald-600 py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-500 transition-all">PAGO / LIBERAR</button>
              </div>
            </div>
          )}

          {mode === 'OPTIONS' && (
            <div className="space-y-6">
              {table.status === 'FREE' ? (
                <button onClick={actions.openTable} className="w-full bg-emerald-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"><PlusCircle size={32} /> ABRIR MESA</button>
              ) : (
                <div className="grid gap-4">
                  <button onClick={() => setMode('MENU')} className="w-full bg-orange-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-orange-900/20"><Utensils size={40} /> LANÇAR PRODUTOS</button>
                  <button onClick={actions.viewBill} className="w-full bg-slate-700 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-600 transition-colors"><Receipt size={24} /> FECHAMENTO / CONTA</button>
                  <button onClick={() => { if(confirm("Deseja forçar a liberação?")) api.patch(`/tables/${table.id}/reset`).then(() => { alert("Mesa Resetada!"); onRefresh(); onClose(); }); }} className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 hover:text-rose-400 uppercase tracking-widest transition-colors"><AlertTriangle size={12} /> Forçar Reset de Segurança</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
EOF

echo "🪑 Atualizando useTables.ts..."
cat > src/hooks/useTables.ts <<EOF
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useTables() {
  const [tables, setTables] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'OPTIONS' | 'MENU' | 'BILL'>('OPTIONS');
  const [billDetails, setBillDetails] = useState<any>(null);

  const loadTables = useCallback(async () => {
    try {
      const res = await api.get('/tables');
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setTables(data.sort((a, b) => a.number - b.number));
    } catch (err) {
      console.error("Erro ao carregar mesas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTables();
    api.get('/products').then(res => setProducts(res.data));
    const interval = setInterval(loadTables, 10000);
    return () => clearInterval(interval);
  }, [loadTables]);

  const closeModal = () => {
    setSelectedTable(null);
    setViewMode('OPTIONS');
    setBillDetails(null);
  };

  const handleOpenTable = async () => {
    if (!selectedTable) return;
    try {
      const userId = 'f461014f-9cec-42e5-9066-37b1d1d33ddb'; // ID de teste
      await api.post('/orders', { tableId: selectedTable.id, userId });
      alert(`Mesa ${selectedTable.number} aberta!`);
      loadTables();
      closeModal();
    } catch (err) {
      alert("Erro ao abrir mesa.");
    }
  };

  const handleAddItem = async (productId: string) => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;
      
      if (!order) {
        alert("Abra a mesa antes de lançar produtos.");
        return;
      }

      await api.post('/orders/add-item', { orderId: order.id, productId, quantity: 1 });
      alert("Produto lançado com sucesso!");
    } catch (err) {
      alert("Erro ao lançar produto.");
    }
  };

  const handleViewBill = async () => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!order || !order.items?.length) {
        if (window.confirm("Mesa sem itens. Deseja liberá-la agora?")) {
          if (order?.id) await api.patch(`/orders/${order.id}/close`);
          else await api.patch(`/tables/${selectedTable.id}/reset`);
          loadTables();
          closeModal();
        }
        return;
      }

      const total = order.items.reduce((acc: number, item: any) => 
        acc + (Number(item.unitPrice || item.product?.price || 0) * item.quantity), 0
      );

      setBillDetails({ ...order, total });
      setViewMode('BILL');
    } catch (err) {
      alert("Erro ao carregar conta.");
    }
  };

  const handleCloseOrder = async () => {
    if (!billDetails?.id) return;
    if (!window.confirm("Confirmar pagamento e liberar mesa?")) return;

    try {
      await api.patch(`/orders/${billDetails.id}/close`);
      alert("✅ Conta fechada com sucesso!");
      loadTables();
      closeModal();
    } catch (err) {
      alert("Erro ao fechar conta.");
    }
  };

  return {
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder
  };
}
EOF

echo "🪑 Atualizando KitchenCard.tsx..."
cat > src/components/KitchenCard.tsx <<EOF
import { Clock, CheckCircle2 } from 'lucide-react';

interface KitchenCardProps {
  item: any;
  tableNumber: string | number;
  onFinish: (id: string) => void;
}

export function KitchenCard({ item, tableNumber, onFinish }: KitchenCardProps) {
  return (
    <div className="bg-slate-900 rounded-[3rem] p-8 border-l-[12px] border-orange-600 shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-orange-600 px-6 py-2 rounded-2xl shadow-lg shadow-orange-900/40">
            <span className="text-white font-black text-2xl italic uppercase leading-none">
              Mesa {tableNumber}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-black/20 px-3 py-1 rounded-full">
            <Clock size={14} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">Pendente</span>
          </div>
        </div>

        {/* Produto e Quantidade */}
        <div className="py-8 border-y border-slate-800/80 my-2">
          <div className="flex items-start gap-4">
            <span className="text-5xl font-black text-orange-500 leading-none">
              {item.quantity}
              <small className="text-lg opacity-50 ml-1 font-mono">x</small>
            </span>
            <h3 className="text-3xl font-bold text-white leading-tight uppercase italic break-words">
              {item.productName}
            </h3>
          </div>
          {item.observation && (
            <p className="mt-4 text-rose-400 font-bold text-sm uppercase bg-rose-500/10 p-2 rounded-lg italic">
              obs: {item.observation}
            </p>
          )}
        </div>
      </div>

      {/* Botão de Finalizar */}
      <button 
        onClick={() => onFinish(item.id)}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all uppercase text-xl shadow-xl shadow-emerald-900/20 active:scale-95 group"
      >
        <CheckCircle2 size={28} className="group-hover:scale-110 transition-transform" />
        PRONTO
      </button>
    </div>
  );
}
EOF

echo "🪑 Atualizando useKitchen.ts..."
cat > src/hooks/useKitchen.ts <<EOF
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useKitchen() {
  const [items, setItems] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Busca itens da fila e lista de mesas em paralelo
      const [itemsRes, tablesRes] = await Promise.all([
        api.get('/orders/kitchen/queue'),
        api.get('/tables')
      ]);
      
      setItems(itemsRes.data);
      setTables(tablesRes.data);
    } catch (err) {
      console.error("Erro ao carregar KDS:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleFinishItem = async (itemId: string) => {
    try {
      await api.patch(`/orders/item/${itemId}/ready`);
      // Remove da tela instantaneamente para dar sensação de velocidade
      setItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      alert("Erro ao finalizar item. Tente novamente.");
    }
  };

  return {
    items,
    tables,
    loading,
    handleFinishItem,
    refresh: fetchData
  };
}
EOF

# 1. Garante que o index.css tem o Tailwind
cat > src/index.css <<EOF
@import "tailwindcss";

/* O resto do seu CSS customizado */
body {
  margin: 0;
  background-color: #0f172a; /* Vamos voltar para o azul escuro padrão */
  color: white;
}
EOF

# 2. Garante que o main.tsx importa o CSS
cat > src/main.tsx <<EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // 👈 ESSA LINHA É VITAL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# 3. Garante que o Tailwind procure nos arquivos certos
cat > tailwind.config.js <<EOF
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

cat > postcss.config.js <<EOF
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
EOF

cat > src/services/api.ts <<EOF
import axios from 'axios';

export const api = axios.create({ 
  // 3000 é a porta padrão do NestJS. 
  // Se você mudou no seu main.ts do backend, coloque a porta certa aqui.
  baseURL: 'http://localhost:3000' 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Restaurante:token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
EOF


echo "✅ Sistema reconstruído com sucesso!"
echo "👉 Rode 'npm run dev' e use a barra lateral para navegar!"
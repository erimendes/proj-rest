#!/bin/bash

PROJECT_NAME="restaurante-web"

# Verifica se está na pasta correta
if [ -d "$PROJECT_NAME" ]; then
    cd $PROJECT_NAME
else
    echo "❌ Pasta $PROJECT_NAME não encontrada. Execute este script na pasta raiz do projeto."
    exit 1
fi

echo "📂 Criando estrutura de pastas caso não existam..."
mkdir -p src/hooks src/views src/components

echo "🎨 Atualizando App.tsx (Navegação Central)..."
cat > src/App.tsx <<EOF
import { useState } from 'react';
import { ChefHat, LayoutDashboard, UtensilsCrossed, TrendingUp } from 'lucide-react'; // Adicionado TrendingUp
import KitchenView from './views/KitchenView';
import TablesView from './views/TablesView';
import DashboardView from './views/DashboardView';

export default function App() {
  // 1. Atualizado para aceitar 'dashboard'
  const [currentView, setCurrentView] = useState<'tables' | 'kitchen' | 'dashboard'>('tables');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex font-sans">
      {/* Sidebar Lateral */}
      <aside className="w-20 md:w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <UtensilsCrossed className="text-orange-500" size={28} />
          <span className="hidden md:block font-black text-xl tracking-tighter italic text-orange-500">REST-OS</span>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          {/* Botão Mapa de Mesas */}
          <button 
            onClick={() => setCurrentView('tables')}
            className={`w-full flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl transition-all ${
              currentView === 'tables' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard size={24} />
            <span className="hidden md:block font-bold text-sm">Mapa de Mesas</span>
          </button>

          {/* Botão Cozinha */}
          <button 
            onClick={() => setCurrentView('kitchen')}
            className={`w-full flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl transition-all ${
              currentView === 'kitchen' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'
            }`}
          >
            <ChefHat size={24} />
            <span className="hidden md:block font-bold text-sm">Cozinha (KDS)</span>
          </button>

          {/* 2. NOVO Botão Dashboard Financeiro */}
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl transition-all ${
              currentView === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'
            }`}
          >
            <TrendingUp size={24} />
            <span className="hidden md:block font-bold text-sm">Financeiro</span>
          </button>
        </nav>

        {/* Status do Servidor */}
        <div className="p-4 border-t border-slate-700">
           <div className="bg-slate-900 p-3 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="hidden md:block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Servidor Online</span>
           </div>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 h-screen overflow-auto bg-slate-900">
        {/* 3. Lógica de renderização atualizada */}
        {currentView === 'tables' && <TablesView />}
        {currentView === 'kitchen' && <KitchenView />}
        {currentView === 'dashboard' && <DashboardView />}
      </main>
    </div>
  );
}
EOF

echo "🚀 Gerando Dashboard Financeiro..."

# --- HOOK ---
cat > src/hooks/useDashboard.ts <<EOF
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useDashboard() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    try {
      const res = await api.get('/orders/reports/sales');
      console.log("DADOS VINDOS DA API:", res.data); // 👈 ADICIONE ISSO
      setReport(res.data);
    } catch (err) {
      console.error("Erro ao carregar relatório:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const ticketMedio = report?.totalOrders > 0 
    ? (report.revenue / report.totalOrders).toFixed(2) 
    : "0.00";

  return {
    report,
    loading,
    ticketMedio,
    refresh: fetchReport
  };
}
EOF

# --- VIEW ---
cat > src/views/DashboardView.tsx <<EOF
import { useDashboard } from '../hooks/useDashboard';
import { StatCard } from '../components/StatCard';
import { RankingItem } from '../components/RankingItem';
import { DollarSign, ShoppingBag, TrendingUp, Trophy, Loader2, RefreshCw } from 'lucide-react';

export default function DashboardView() {
  const { report, loading, ticketMedio, refresh } = useDashboard();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-emerald-500 italic font-black">
      <Loader2 className="animate-spin mr-2" /> PROCESSANDO VENDAS...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-white">
      <div className="flex justify-between items-end mb-12 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Dashboard</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Resultados Financeiros</p>
        </div>
        <button onClick={refresh} className="p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 text-slate-400 active:scale-95 transition-all">
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard 
          label="Faturamento Total" 
          value={\`R$ \${Number(report?.revenue || 0).toFixed(2)}\`} 
          icon={DollarSign} 
          colorClass="border-emerald-600 text-emerald-500"
        />
        <StatCard 
          label="Comandas Pagas" 
          value={report?.totalOrders || 0} 
          icon={ShoppingBag} 
          colorClass="border-blue-600 text-blue-500"
        />
        <StatCard 
          label="Ticket Médio" 
          value={\`R$ \${ticketMedio}\`} 
          icon={TrendingUp} 
          colorClass="border-purple-600 text-purple-500"
        />
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 shadow-2xl border border-white/5">
        <div className="flex items-center gap-6 mb-12">
          <div className="bg-orange-600 p-4 rounded-3xl shadow-xl shadow-orange-900/40"><Trophy size={40} /></div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Top Performance</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {report?.topProducts?.map((item: any, index: number) => (
            <RankingItem key={index} name={item.name} total={item.totalSold} index={index} />
          ))}
          
          {!report?.topProducts?.length && (
            <p className="text-center py-10 text-slate-700 font-black italic uppercase">Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}
EOF

# --- COMPONENT: STATCARD ---
cat > src/components/StatCard.tsx <<EOF
// Adicionamos a palavra 'type' antes do nome do ícone
import type { LucideIcon } from 'lucide-react'; 

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon; // Agora o TS aceita o uso do tipo aqui
  colorClass: string;
}

export function StatCard({ label, value, icon: Icon, colorClass }: StatCardProps) {
  return (
    <div className={`bg-slate-900 p-10 rounded-[3.5rem] border-b-[12px] ${colorClass} shadow-2xl relative overflow-hidden`}>
      {/* O ícone renderiza normalmente como um componente */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Icon size={80} />
      </div>
      <p className="mb-4 font-black uppercase tracking-widest text-xs flex items-center gap-2 opacity-80">
        <Icon size={16} /> {label}
      </p>
      <h2 className="text-5xl font-black italic font-mono tracking-tighter">
        {value}
      </h2>
    </div>
  );
}
EOF

# --- COMPONENT: RANKINGITEM ---
cat > src/components/RankingItem.tsx <<EOF
import { Star } from 'lucide-react';

interface RankingItemProps {
  name: string;
  total: number;
  index: number;
}

export function RankingItem({ name, total, index }: RankingItemProps) {
  return (
    <div className="group flex items-center justify-between bg-black/40 p-8 rounded-[2.5rem] hover:bg-orange-600 transition-all border border-white/5">
      <div className="flex items-center gap-10">
        <span className="text-4xl font-black italic text-slate-800 group-hover:text-white/30">
          {index === 0 ? <Star className="text-yellow-500 fill-yellow-500" /> : `#0${index + 1}`}
        </span>
        <span className="text-3xl font-black uppercase italic tracking-tighter text-white">
          {name}
        </span>
      </div>
      <div className="text-right">
        <span className="block text-5xl font-black text-orange-500 group-hover:text-white italic leading-none font-mono">
          {total}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-white/70">
          Unidades
        </span>
      </div>
    </div>
  );
}
EOF

echo "✅ Arquivos gerados com sucesso em $PROJECT_NAME!"
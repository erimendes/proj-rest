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
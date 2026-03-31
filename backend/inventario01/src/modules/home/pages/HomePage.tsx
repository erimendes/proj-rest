import { useAuth } from '../../../app/providers/AuthContext';
import { LogOut, LayoutDashboard, Package } from 'lucide-react';

export default function HomePage() {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 backdrop-blur-md">
        <div className="flex items-center gap-2 font-black text-orange-500 italic tracking-tighter">
          <LayoutDashboard /> INVENTÁRIO PRO
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors font-bold text-sm uppercase cursor-pointer">
          <LogOut size={18} /> Sair
        </button>
      </header>
      <main className="p-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Dashboard Inicial 👋</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
               <p className="text-slate-400 text-xs uppercase font-black">Total de Itens</p>
               <Package className="text-orange-500" size={20} />
            </div>
            <p className="text-4xl font-black">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

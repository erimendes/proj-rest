import { useAuth } from '../../app/providers/AuthContext';
import { Home, Table, Box, FileText, LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }: any) {
  const { logout } = useAuth();
  const menu = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mesas', label: 'Mesas' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'relatorios', label: 'Relatórios' }
  ];

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-black text-orange-500 italic text-xl cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={24} /> INVENTÁRIO PRO
        </div>
        <div className="flex gap-6">
          {menu.map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`text-sm font-bold cursor-pointer transition-colors ${activeTab === item.id ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 font-bold text-xs cursor-pointer">
        <LogOut size={16} /> SAIR
      </button>
    </nav>
  );
}

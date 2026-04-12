import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import { LogOut, LayoutDashboard, Package, Users, Tags, Menu, X, LayoutGrid } from 'lucide-react';

export function DashboardLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Produtos', icon: Package, path: '/produtos' },
    { label: 'Categorias', icon: Tags, path: '/categorias' },
    { label: 'Usuários', icon: Users, path: '/usuarios' },
    { label: 'Mesas', icon: LayoutGrid, path: '/mesas' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-black text-orange-500 italic text-xl tracking-tighter">INV-PRO</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-700 rounded-lg cursor-pointer">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-xl transition-all group ${
                location.pathname === item.path 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span className="ml-3 font-bold text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button onClick={logout} className="w-full flex items-center p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all cursor-pointer">
            <LogOut size={22} />
            {isSidebarOpen && <span className="ml-3 font-bold text-sm">Sair do Sistema</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

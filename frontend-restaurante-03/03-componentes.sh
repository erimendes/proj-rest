#!/bin/bash
APP_NAME="restaurante01"
cd "$APP_NAME" || exit 1
echo "🏗️ Criando componentes de UI globais..."

mkdir -p src/shared/components
rm -rf "src/shared/{components}" # Limpeza de segurança

# Button
cat > src/shared/components/Button.tsx <<'EOF'
export function Button({ children, loading, ...props }: any) {
  return (
    <button {...props} className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 transition p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-white cursor-pointer shadow-lg shadow-orange-900/20">
      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
    </button>
  );
}
EOF

# Input
cat > src/shared/components/Input.tsx <<'EOF'
export function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />}
      <input {...props} className={`w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-orange-500 outline-none text-white transition-all ${Icon ? 'pl-10' : 'pl-4'}`} />
    </div>
  );
}
EOF

# Navbar (Agora recebe props para navegação)
cat > src/shared/components/Navbar.tsx <<'EOF'
import { useAuth } from '../../app/providers/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }: any) {
  const { logout } = useAuth();
  const menu = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mesas', label: 'Mesas' },
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
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`text-sm font-bold cursor-pointer transition-colors ${activeTab === item.id ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}>
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
EOF

echo "✅ Componentes criados com sucesso!"
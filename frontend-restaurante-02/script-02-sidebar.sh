#!/bin/bash
APP_NAME="inventario01"

cd $APP_NAME || { echo "❌ Projeto não encontrado"; exit 1; }

echo "🔨 Atualizando para Arquitetura de Rotas Reais (React Router)..."

# 1. Instalar o React Router Dom
echo "📦 Instalando react-router-dom..."
npm install react-router-dom

# 2. Criar pastas necessárias
echo "📁 Criando estrutura de pastas..."
mkdir -p src/modules/products/pages
mkdir -p src/modules/categories/pages
mkdir -p src/modules/users/pages
mkdir -p src/shared/layouts

# 3. Criar Página de Produtos
cat > src/modules/products/pages/ProductsPage.tsx <<'EOF'
import { Package, Plus } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Produtos</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all text-white">
          <Plus size={20} /> Novo Produto
        </button>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <Package className="mx-auto text-slate-600 mb-4" size={48} />
        <p className="text-slate-500 italic">Nenhum produto cadastrado no estoque.</p>
      </div>
    </div>
  );
}
EOF

# 4. Criar Página de Categorias
cat > src/modules/categories/pages/CategoriesPage.tsx <<'EOF'
import { Tags, Plus } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Categorias</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all text-white">
          <Plus size={20} /> Nova Categoria
        </button>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <Tags className="mx-auto text-slate-600 mb-4" size={48} />
        <p className="text-slate-500 italic">Nenhuma categoria definida.</p>
      </div>
    </div>
  );
}
EOF

# 5. Criar Página de Usuários
cat > src/modules/users/pages/UsersPage.tsx <<'EOF'
import { Users, Plus } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Usuários</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all text-white">
          <Plus size={20} /> Novo Usuário
        </button>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <Users className="mx-auto text-slate-600 mb-4" size={48} />
        <p className="text-slate-500 italic">Apenas você está registrado no sistema.</p>
      </div>
    </div>
  );
}
EOF

# 6. Criar o Dashboard Layout (Sidebar + Outlet)
cat > src/shared/layouts/DashboardLayout.tsx <<'EOF'
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import { LogOut, LayoutDashboard, Package, Users, Tags, Menu, X } from 'lucide-react';

export function DashboardLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Produtos', icon: Package, path: '/produtos' },
    { label: 'Categorias', icon: Tags, path: '/categorias' },
    { label: 'Usuários', icon: Users, path: '/usuarios' },
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
EOF

# 7. Atualizar o Gerenciador de Rotas
cat > src/routes/index.tsx <<'EOF'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';

import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';
import ProductsPage from '../modules/products/pages/ProductsPage';
import CategoriesPage from '../modules/categories/pages/CategoriesPage';
import UsersPage from '../modules/users/pages/UsersPage';

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <AuthPage /> : <Navigate to="/" />} />

        <Route element={token ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
EOF

# 8. Garantir que o App.tsx use o AppRoutes atualizado
cat > src/App.tsx <<'EOF'
import { AuthProvider } from './app/providers/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
EOF

echo "✅ Atualização concluída!"
echo "🚀 Reinicie o servidor: npm run dev"
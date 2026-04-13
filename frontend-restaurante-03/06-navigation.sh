#!/bin/bash
APP_NAME="restaurante01"
cd "$APP_NAME" || exit 1
echo "🔗 Finalizando navegação e HomePage..."

# HomePage Unificada
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
import TablesPage from '../../tables/pages/TablesPage';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-8 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'mesas' && <TablesPage />}
        {activeTab === 'relatorios' && <div className="py-20 text-center text-slate-500">Relatórios em breve...</div>}
      </main>
    </div>
  );
}
EOF

# Rotas
cat > src/routes/index.tsx <<'EOF'
import { useAuth } from '../app/providers/AuthContext';
import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';

export function AppRoutes() {
  const { token } = useAuth();
  return token ? <HomePage key={token} /> : <AuthPage />;
}
EOF

# Limpeza final de cache
rm -rf node_modules/.vite
echo "✅ Sistema organizado com Sucesso!"
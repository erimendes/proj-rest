#!/bin/bash
APP_NAME="inventario01"

# Entrar na pasta do projeto
cd $APP_NAME || { echo "❌ Erro: Pasta $APP_NAME não encontrada. Crie o projeto com Vite primeiro."; exit 1; }

echo "🚀 Iniciando Unificação: UI Profissional + Arquitetura Modular..."

# 1. Instalar todas as dependências necessárias
echo "📦 1/14 - Instalando dependências (Axios, Lucide, Tailwind v4)..."
npm install axios lucide-react
npm install tailwindcss @tailwindcss/vite --save-dev

# 2. Criar Estrutura Completa de Pastas
echo "📁 2/14 - Criando pastas do projeto..."
mkdir -p src/{app/providers,core/services,routes,shared/{components,layouts,hooks,utils,types}}
mkdir -p src/modules/auth/{pages,components,services}
mkdir -p src/modules/home/pages

# 3. Configuração do Vite para Tailwind v4
echo "⚙️ 3/14 - Configurando Vite para Tailwind v4..."
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
EOF

# 4. CSS Global (Dark Mode e Brand Color)
echo "📡 4/14 - Criando CSS Global (src/index.css)..."
cat > src/index.css <<EOF
@import "tailwindcss";

@theme {
  --color-brand: #f97316;
}

body {
  @apply bg-slate-900 text-slate-100 antialiased font-sans;
}
EOF

# 5. API Service (Axios com Interceptor de Token)
echo "📡 5/14 - Criando API Service (src/core/services/api.ts)..."
cat > src/core/services/api.ts <<'EOF'
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Inventario:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
EOF

# 6. Auth Service (Lógica de Requisição isolada)
echo "📡 6/14 - Criando Auth Service (src/modules/auth/services/authService.ts)..."
cat > src/modules/auth/services/authService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const loginRequest = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const registerRequest = (data: any) => 
  api.post('/auth/register', data);
EOF

# 7. Shared Components: Button
echo "🖥️ 7/14 - Criando Shared Component: Button.tsx"
cat > src/shared/components/Button.tsx <<'EOF'
export function Button({ children, loading, ...props }: any) {
  return (
    <button
      {...props}
      className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 transition p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-white cursor-pointer"
    >
      {loading ? "Processando..." : children}
    </button>
  );
}
EOF

# 8. Shared Components: Input com Ícone Dinâmico
echo "🖥️ 8/14 - Criando Shared Component: Input.tsx"
cat > src/shared/components/Input.tsx <<'EOF'
export function Input({ icon: Icon, ...props }: any) {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-3 text-slate-500" size={20} />}
      <input
        {...props}
        className={`w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-orange-500 outline-none text-white transition-all ${Icon ? 'pl-10' : ''}`}
      />
    </div>
  );
}
EOF

# 9. Auth Context (Estado Global da Autenticação)
echo "🖥️ 9/14 - Criando Auth Context (src/app/providers/AuthContext.tsx)..."
cat > src/app/providers/AuthContext.tsx <<'EOF'
import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem('@Inventario:token'));

  const login = (newToken: string) => {
    localStorage.setItem('@Inventario:token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('@Inventario:token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
EOF

# 10. Auth Page (A UI de Login unificada)
echo "🖥️ 10/14 - Criando Auth Page (src/modules/auth/pages/AuthPage.tsx)..."
cat > src/modules/auth/pages/AuthPage.tsx <<'EOF'
import { useState } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import { loginRequest, registerRequest } from '../services/authService';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Lock, Mail, Package, User } from 'lucide-react';

export default function AuthPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginRequest(email, password);
        login(res.data.access_token);
      } else {
        await registerRequest({ name, email, password, role: 'ADMIN' });
        alert('Conta criada com sucesso! Agora faça seu login.');
        setMode('login'); // Volta para o login após registrar
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro na operação. Verifique o backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-slate-800 p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl border border-slate-700 transition-all"
      >
        <div className="text-center">
          <Package size={50} className="mx-auto text-orange-500 mb-2" />
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
            Inventário Pro
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            {mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
          </p>
        </div>

        <div className="space-y-3">
          {/* Campo de Nome aparece apenas no Registro */}
          {mode === 'register' && (
            <Input 
              icon={User} 
              type="text" 
              placeholder="Nome completo" 
              value={name} 
              onChange={(e: any) => setName(e.target.value)} 
              required 
            />
          )}

          <Input 
            icon={Mail} 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e: any) => setEmail(e.target.value)} 
            required 
          />

          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e: any) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <Button type="submit" loading={loading}>
          {mode === 'login' ? 'ACESSAR SISTEMA' : 'CRIAR CONTA AGORA'}
        </Button>

        <div className="text-center border-t border-slate-700 pt-4">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-orange-500 hover:text-orange-400 text-sm font-bold transition-colors cursor-pointer"
          >
            {mode === 'login' 
              ? "Não tem uma conta? Cadastre-se" 
              : "Já possui conta? Faça login"}
          </button>
        </div>
      </form>
    </div>
  );
}
EOF

# 11. Home Page (Dashboard Inicial)
echo "🖥️ 11/14 - Criando Home Page (src/modules/home/pages/HomePage.tsx)..."
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
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
EOF

# 12. Rotas (Lógica de Navegação Condicional)
echo "🖥️ 12/14 - Criando Lógica de Rotas (src/routes/index.tsx)..."
cat > src/routes/index.tsx <<'EOF'
import { useAuth } from '../app/providers/AuthContext';
import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';

export function AppRoutes() {
  const { token } = useAuth();
  return token ? <HomePage /> : <AuthPage />;
}
EOF

# 13. App Principal (O Coração com o Provider)
echo "🖥️ 13/14 - Criando App Principal (src/App.tsx)..."
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

# 14. Limpeza e Finalização
echo "🧹 14/14 - Limpando arquivos residuais do Vite..."
rm -f src/App.css src/assets/react.svg
cat > src/main.tsx <<EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

echo ""
echo "✅ PROJETO PRONTO, UNIFICADO E MODULARIZADO!"
echo "---------------------------------------------------"
echo "🚀 Comandos para iniciar:"
echo "   1. cd $APP_NAME"
echo "   2. npm run dev"
echo "---------------------------------------------------"
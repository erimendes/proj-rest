#!/bin/bash
APP_NAME="restaurante01"

cd "$APP_NAME" || { echo "❌ Pasta $APP_NAME não encontrada."; exit 1; }

echo "🚀 Setup corrigido..."

# Dependências
npm install axios lucide-react
npm install tailwindcss @tailwindcss/vite --save-dev

# Estrutura
mkdir -p src/{app/providers,core/services,routes,shared/{components},modules/auth/{pages,services},modules/home/pages}

# Vite
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
EOF

# CSS
cat > src/index.css <<EOF
@import "tailwindcss";
body { @apply bg-slate-900 text-white; }
EOF

# API
cat > src/core/services/api.ts <<'EOF'
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Inventario:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
EOF

# Auth Service
cat > src/modules/auth/services/authService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const loginRequest = (email: string, password: string) =>
  api.post('/auth/login', { email, password });
EOF

# Auth Context (CORRIGIDO)
cat > src/app/providers/AuthContext.tsx <<'EOF'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('@Inventario:token');
    if (stored) setToken(stored);
  }, []);

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

# Auth Page (CORRIGIDO 🔥)
cat > src/modules/auth/pages/AuthPage.tsx <<'EOF'
import { useState } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import { loginRequest } from '../services/authService';
import { Mail, Lock } from 'lucide-react';

export default function AuthPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginRequest(email, password);
      const token = res.data.accessToken;

      if (!token) {
        alert("Erro no login");
        return;
      }

      login(token);
    } catch {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-4 border border-slate-800"
      >
        <h1 className="text-xl font-bold text-center text-orange-500">
          Login
        </h1>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            className="w-full p-3 pl-10 rounded bg-slate-800 text-white"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            type="password"
            className="w-full p-3 pl-10 rounded bg-slate-800 text-white"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-orange-600 p-3 rounded font-bold hover:bg-orange-500">
          Entrar
        </button>
      </form>
    </div>
  );
}
EOF

# Home (SEM /users/me ❌)
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
import { useAuth } from '../../../app/providers/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <header className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
        <div className="flex items-center gap-2 text-orange-500 font-black italic">
          <LayoutDashboard size={20} />
          INVENTÁRIO PRO
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition text-sm"
        >
          <LogOut size={16} />
          Sair
        </button>
      </header>

      <main className="p-6">
        <h1 className="text-2xl font-bold">HOME ✅</h1>

        <div className="mt-4 p-6 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-slate-400">Login funcionando com sucesso 🎉</p>
        </div>
      </main>
    </div>
  );
}
EOF

# Rotas (FORÇA RE-RENDER)
cat > src/routes/index.tsx <<'EOF'
import { useAuth } from '../app/providers/AuthContext';
import AuthPage from '../modules/auth/pages/AuthPage';
import HomePage from '../modules/home/pages/HomePage';

export function AppRoutes() {
  const { token } = useAuth();
  return token ? <HomePage key={token} /> : <AuthPage />;
}
EOF

# App
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

# Main
cat > src/main.tsx <<EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
EOF

echo "✅ CORRIGIDO COM SUCESSO!"
#!/bin/bash
set -e

APP_NAME="restaurante04"
cd "$APP_NAME"

echo "🔐 Criando core + auth..."

# App
cat > src/App.tsx <<'EOF'
import { BrowserRouter } from 'react-router-dom'; // 1. Importe isso
import { AuthProvider } from './app/providers/AuthContext';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter> {/* 2. Envolva toda a aplicação */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
EOF

# Auth Context
cat > src/app/providers/AuthContext.tsx <<'EOF'
// Adicione "type" antes de ReactNode
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

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

# API
cat > src/core/services/api.ts <<'EOF'
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  // 1. Buscamos o token (tentando as duas chaves mais prováveis do seu sistema)
  const rawToken = localStorage.getItem('@Inventario:token') || localStorage.getItem('token');
  
  if (rawToken && config.headers) {
    // 2. CORREÇÃO CRÍTICA: Remove aspas duplas que o JSON.stringify costuma colocar
    // Se o token for "abc", o replace transforma em abc. 
    // Sem isso, o header vira "Bearer "abc"", o que o NestJS rejeita (401).
    const cleanToken = rawToken.replace(/"/g, '').trim();
    
    config.headers.Authorization = `Bearer ${cleanToken}`;
    
    // Log para você conferir no console se o token está saindo limpo
    console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
  } else {
    console.warn('⚠️ API: NENHUM TOKEN ENCONTRADO NO STORAGE!');
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚫 Bloqueado pelo Backend (401): Token inválido ou expirado.");
    }
    return Promise.reject(error);
  }
);
EOF

# MAIN
cat > src/main.tsx <<'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
EOF

# Auth register
cat > src/modules/auth/pages/RegisterPage.tsx <<'EOF'
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para navegar após o registro
import { registerRequest } from '../services/authService';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerRequest(name, email, password);
      alert("Conta criada com sucesso!");
      navigate('/login'); // Redireciona para o login após cadastrar
    } catch (error) {
      alert("Erro ao criar conta. Tente outro e-mail.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-4 border border-slate-800">
        <h1 className="text-xl font-bold text-center text-orange-500 uppercase">Criar Conta</h1>

        <div className="relative">
          <User className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            required
            className="w-full p-3 pl-10 rounded bg-slate-800 text-white outline-none focus:border-orange-500 border border-transparent"
            placeholder="Nome Completo"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            required
            type="email"
            className="w-full p-3 pl-10 rounded bg-slate-800 text-white outline-none focus:border-orange-500 border border-transparent"
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
          <input
            required
            type="password"
            className="w-full p-3 pl-10 rounded bg-slate-800 text-white outline-none focus:border-orange-500 border border-transparent"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="w-full bg-orange-600 p-3 rounded font-bold hover:bg-orange-500 flex justify-center">
          {isLoading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
        </button>

        <p className="text-slate-400 text-sm text-center">
          Já tem uma conta? <Link title="Login" to="/login" className="text-orange-500 hover:underline">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}
EOF

# Auth Page
cat > src/modules/auth/pages/AuthPage.tsx <<'EOF'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import { loginRequest } from '../services/authService';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 🔥 Schema Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const navigator = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginRequest(data.email, data.password);
      const token = res?.data?.accessToken;

      if (!token) throw new Error();

      login(token);
      navigator("/home");
    } catch (error) {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-4 border border-slate-800"
      >
        <h1 className="text-xl font-bold text-center text-orange-500 uppercase tracking-wider">
          Login
        </h1>

        {/* EMAIL */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 rounded bg-slate-800 text-white"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
              className="w-full p-3 pl-10 rounded bg-slate-800 text-white"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 p-3 rounded font-bold flex justify-center items-center"
        >
          {isSubmitting 
            ? <Loader2 className="animate-spin" size={20} /> 
            : "Entrar"}
        </button>

        <div className="text-center mt-4 border-t border-slate-800 pt-4">
          <p className="text-slate-400 text-sm">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="text-orange-500 font-semibold">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
EOF

# Auth Service
cat > src/modules/auth/services/authService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const registerRequest = async (name: string, email: string, password: string) => {
  // Ajuste a URL e os campos conforme o seu backend (ex: /auth/register ou /users)
  return await api.post('/register', { name, email, password });
};

export const loginRequest = async (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};
EOF

# Routes
cat > src/routes/index.tsx <<'EOF'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthContext';

import AuthPage from '../modules/auth/pages/AuthPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import HomePage from '../modules/home/pages/HomePage';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* privada */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
EOF

# Private Route
cat > src/routes/PrivateRoute.tsx <<'EOF'
import { Navigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthContext";
import React from "react"; // Certifique-se de importar o React

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    // O 'replace' impede que o usuário volte para a rota protegida ao clicar em "Voltar"
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
EOF

# Dashboard (Home)
cat > src/modules/home/components/DashboardView.tsx <<'EOF'
import { TrendingUp, Users, Package, Activity } from 'lucide-react';

export function DashboardView() {
  const cards = [
    { label: 'Vendas', val: 'R$ 0,00', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Clientes', val: '0', icon: Users, color: 'text-blue-500' },
    { label: 'Estoque', val: '12', icon: Package, color: 'text-orange-500' },
    { label: 'Ativas', val: '0', icon: Activity, color: 'text-purple-500' },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <h1 className="text-2xl font-bold">Resumo Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <c.icon className={`${c.color} mb-2`} size={24} />
            <p className="text-slate-500 text-xs font-black uppercase">{c.label}</p>
            <p className="text-2xl font-bold">{c.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

# Home Page
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
// import TablesPage from '../../tables/pages/TablesPage';
// import ReportsPage from '../../reports/pages/ReportsPage';
// import ProductsPage from '../../products/pages/ProductsPage';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-8 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'mesas' && <TablesPage />}
        {activeTab === 'produtos' && <ProductsPage />}
        {activeTab === 'relatorios' && <ReportsPage />}
      </main>
    </div>
  );
}
EOF

# Navbar
cat > src/shared/components/Navbar.tsx <<'EOF'
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
EOF

# Buttton
cat > src/shared/components/Button.tsx <<'EOF'
export function Button({ children, loading, ...props }: any) {
  return (
    <button {...props} className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 transition p-3 rounded-xl font-bold flex justify-center items-center gap-2 text-white cursor-pointer shadow-lg shadow-orange-900/20">
      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
    </button>
  );
}
EOF

# Criando o componente de Input
cat > src/shared/components/Input.tsx <<'EOF'
import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-orange-500 text-white transition-colors placeholder:text-slate-600 ${className}`}
      />
    </div>
  );
}
EOF


echo "✅ CORE + AUTH OK"
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
        
        // 1. Mostra no console para você conferir a estrutura (UUID, etc)
        console.log("CONTEÚDO DA RESPOSTA:", res.data);

        // 2. Salva o usuário no LocalStorage de forma dinâmica
        // Verificamos se 'user' existe na resposta. Se não, tentamos 'userId'.
        const userData = res.data.user || { 
          id: res.data.userId || res.data.id, 
          email: email 
        };

        if (userData.id) {
          localStorage.setItem('@Inventario:user', JSON.stringify(userData));
        } else {
          console.error("ERRO: O backend não retornou um ID válido.");
        }

        // 3. Efetua o login no contexto (salva o token)
        login(res.data.access_token);
        
      } else {
        // Lógica de Registro
        await registerRequest({ name, email, password, role: 'ADMIN' });
        alert('Conta criada com sucesso! Agora faça seu login.');
        setMode('login');
      }
    } catch (err: any) {
      console.error("ERRO NA OPERAÇÃO:", err.response?.data);
      alert(err.response?.data?.message || 'Erro na operação. Verifique o console.');
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
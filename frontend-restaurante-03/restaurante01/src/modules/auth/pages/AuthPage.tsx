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

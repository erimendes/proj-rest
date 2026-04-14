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

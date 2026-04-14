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

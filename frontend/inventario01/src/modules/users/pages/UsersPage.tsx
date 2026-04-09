import { useEffect, useState } from 'react';
import { api } from '../../../core/services/api';
import { Users, Plus, Loader2, ShieldCheck } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Erro ao buscar usuários", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Usuários</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 text-white">
          <Plus size={20} /> Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-black">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Cargo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-bold">{u.name}</td>
                  <td className="p-4 text-slate-400">{u.email}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded-lg">
                      <ShieldCheck size={14}/> {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

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

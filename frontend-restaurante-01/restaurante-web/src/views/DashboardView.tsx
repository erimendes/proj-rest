import { useDashboard } from '../hooks/useDashboard';
import { StatCard } from '../components/StatCard';
import { RankingItem } from '../components/RankingItem';
import { DollarSign, ShoppingBag, TrendingUp, Trophy, Loader2, RefreshCw } from 'lucide-react';

export default function DashboardView() {
  const { report, loading, ticketMedio, refresh } = useDashboard();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-emerald-500 italic font-black">
      <Loader2 className="animate-spin mr-2" /> PROCESSANDO VENDAS...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-white">
      <div className="flex justify-between items-end mb-12 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Dashboard</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Resultados Financeiros</p>
        </div>
        <button onClick={refresh} className="p-4 bg-slate-900 rounded-2xl hover:bg-slate-800 text-slate-400 active:scale-95 transition-all">
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard 
          label="Faturamento Total" 
          value={`R$ ${Number(report?.revenue || 0).toFixed(2)}`} 
          icon={DollarSign} 
          colorClass="border-emerald-600 text-emerald-500"
        />
        <StatCard 
          label="Comandas Pagas" 
          value={report?.totalOrders || 0} 
          icon={ShoppingBag} 
          colorClass="border-blue-600 text-blue-500"
        />
        <StatCard 
          label="Ticket Médio" 
          value={`R$ ${ticketMedio}`} 
          icon={TrendingUp} 
          colorClass="border-purple-600 text-purple-500"
        />
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 shadow-2xl border border-white/5">
        <div className="flex items-center gap-6 mb-12">
          <div className="bg-orange-600 p-4 rounded-3xl shadow-xl shadow-orange-900/40"><Trophy size={40} /></div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Top Performance</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {report?.topProducts?.map((item: any, index: number) => (
            <RankingItem key={index} name={item.name} total={item.totalSold} index={index} />
          ))}
          
          {!report?.topProducts?.length && (
            <p className="text-center py-10 text-slate-700 font-black italic uppercase">Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}

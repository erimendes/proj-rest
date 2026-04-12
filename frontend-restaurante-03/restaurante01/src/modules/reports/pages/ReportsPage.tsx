import { FileText, Download, BarChart3, PieChart } from 'lucide-react';
import { Button } from '../../../shared/components/Button';

export default function ReportsPage() {
  const mockActivities = [
    { id: 1, desc: 'Abertura de mesa 05', time: '10:30', user: 'Admin' },
    { id: 2, desc: 'Fechamento de conta mesa 02', time: '11:15', user: 'Admin' },
    { id: 3, desc: 'Novo produto cadastrado: Coca-Cola', time: '11:45', user: 'Admin' },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <BarChart3 className="text-orange-500" /> RELATÓRIOS & LOGS
          </h1>
          <p className="text-slate-500">Analise o desempenho e histórico do seu restaurante.</p>
        </div>
        <div className="w-full md:w-auto">
          <Button variant="outline">
            <Download size={20} /> EXPORTAR PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Resumo de Vendas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-orange-500" /> Atividade Recente
          </h3>
          <div className="space-y-4">
            {mockActivities.map(act => (
              <div key={act.id} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <div>
                  <p className="text-sm font-bold text-white">{act.desc}</p>
                  <p className="text-xs text-slate-500">{act.user} • {act.time}</p>
                </div>
                <FileText size={18} className="text-slate-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Card de Atalhos */}
        <div className="bg-orange-600 p-6 rounded-3xl flex flex-col justify-between text-white shadow-xl shadow-orange-900/20">
          <div>
            <h3 className="text-xl font-black italic mb-2">PRO VERSION</h3>
            <p className="text-sm opacity-90">Desbloqueie gráficos comparativos e integração com Power BI.</p>
          </div>
          <button className="mt-6 bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
}

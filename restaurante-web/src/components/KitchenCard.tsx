import { Clock, CheckCircle2 } from 'lucide-react';

interface KitchenCardProps {
  item: any;
  tableNumber: string | number;
  onFinish: (id: string) => void;
}

export function KitchenCard({ item, tableNumber, onFinish }: KitchenCardProps) {
  return (
    <div className="bg-slate-900 rounded-[3rem] p-8 border-l-[12px] border-orange-600 shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-orange-600 px-6 py-2 rounded-2xl shadow-lg shadow-orange-900/40">
            <span className="text-white font-black text-2xl italic uppercase leading-none">
              Mesa {tableNumber}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-black/20 px-3 py-1 rounded-full">
            <Clock size={14} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">Pendente</span>
          </div>
        </div>

        {/* Produto e Quantidade */}
        <div className="py-8 border-y border-slate-800/80 my-2">
          <div className="flex items-start gap-4">
            <span className="text-5xl font-black text-orange-500 leading-none">
              {item.quantity}
              <small className="text-lg opacity-50 ml-1 font-mono">x</small>
            </span>
            <h3 className="text-3xl font-bold text-white leading-tight uppercase italic break-words">
              {item.productName}
            </h3>
          </div>
          {item.observation && (
            <p className="mt-4 text-rose-400 font-bold text-sm uppercase bg-rose-500/10 p-2 rounded-lg italic">
              obs: {item.observation}
            </p>
          )}
        </div>
      </div>

      {/* Botão de Finalizar */}
      <button 
        onClick={() => onFinish(item.id)}
        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all uppercase text-xl shadow-xl shadow-emerald-900/20 active:scale-95 group"
      >
        <CheckCircle2 size={28} className="group-hover:scale-110 transition-transform" />
        PRONTO
      </button>
    </div>
  );
}
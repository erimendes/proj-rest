import { X, Trash2, ShoppingCart, Utensils, Receipt, AlertTriangle, PlusCircle } from 'lucide-react';
import { api } from '../services/api';

interface TableModalProps {
  table: any;
  mode: 'OPTIONS' | 'MENU' | 'BILL';
  setMode: (mode: 'OPTIONS' | 'MENU' | 'BILL') => void;
  products: any[];
  bill: any;
  onClose: () => void;
  onRefresh: () => void;
  actions: {
    openTable: () => void;
    addItem: (id: string) => void;
    viewBill: () => void;
    closeOrder: () => void;
  };
}

export function TableModal({ table, mode, setMode, products, bill, onClose, onRefresh, actions }: TableModalProps) {
  if (!table) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 text-white">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-black italic text-orange-500 uppercase">Mesa {table.number}</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Gestão de Atendimento</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { if(confirm("Apagar mesa?")) api.delete(`/tables/${table.id}`).then(() => { onRefresh(); onClose(); }); }} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-full"><Trash2 /></button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors"><X size={32}/></button>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {mode === 'MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <button key={p.id} onClick={() => actions.addItem(p.id)} className="bg-slate-900/40 hover:bg-orange-600 p-6 rounded-3xl flex justify-between items-center transition-all group border border-white/5 text-left">
                  <div>
                    <p className="font-bold text-xl">{p.name}</p>
                    <p className="text-orange-500 group-hover:text-white font-black italic font-mono">R$ {Number(p.price).toFixed(2)}</p>
                  </div>
                  <ShoppingCart className="text-emerald-500 group-hover:text-white" />
                </button>
              ))}
              <button onClick={() => setMode('OPTIONS')} className="sm:col-span-2 py-4 text-slate-500 underline font-bold uppercase text-xs">Voltar</button>
            </div>
          )}

          {mode === 'BILL' && (
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5 space-y-3">
                {bill?.items.map((i: any) => (
                  <div key={i.id} className="flex justify-between italic text-slate-300">
                    <span>{i.quantity}x {i.product?.name}</span>
                    <b className="text-white font-mono">R$ {(i.unitPrice * i.quantity).toFixed(2)}</b>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-end border-t border-dashed border-slate-700">
                  <span className="font-black text-slate-500 uppercase italic">Total Geral</span>
                  <span className="text-5xl font-black text-emerald-500 italic font-mono">R$ {bill.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setMode('OPTIONS')} className="flex-1 bg-slate-700 py-5 rounded-2xl font-bold uppercase">Voltar</button>
                <button onClick={actions.closeOrder} className="flex-[2] bg-emerald-600 py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-500 transition-all">PAGO / LIBERAR</button>
              </div>
            </div>
          )}

          {mode === 'OPTIONS' && (
            <div className="space-y-6">
              {table.status === 'FREE' ? (
                <button onClick={actions.openTable} className="w-full bg-emerald-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"><PlusCircle size={32} /> ABRIR MESA</button>
              ) : (
                <div className="grid gap-4">
                  <button onClick={() => setMode('MENU')} className="w-full bg-orange-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-orange-900/20"><Utensils size={40} /> LANÇAR PRODUTOS</button>
                  <button onClick={actions.viewBill} className="w-full bg-slate-700 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-600 transition-colors"><Receipt size={24} /> FECHAMENTO / CONTA</button>
                  <button onClick={() => { if(confirm("Deseja forçar a liberação?")) api.patch(`/tables/${table.id}/reset`).then(() => { alert("Mesa Resetada!"); onRefresh(); onClose(); }); }} className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 hover:text-rose-400 uppercase tracking-widest transition-colors"><AlertTriangle size={12} /> Forçar Reset de Segurança</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
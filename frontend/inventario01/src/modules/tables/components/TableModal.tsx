import { X, Trash2, ShoppingCart, Utensils, Receipt, AlertTriangle, PlusCircle } from 'lucide-react';
import { api } from '../../../core/services/api';

interface TableModalProps {
  table: any; 
  mode: 'OPTIONS' | 'MENU' | 'BILL';
  // 1. Mudamos o nome na interface para bater com o uso interno
  setViewMode: (m: 'OPTIONS' | 'MENU' | 'BILL') => void; 
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

// 2. Agora recebemos setViewMode corretamente via props
export function TableModal({ 
  table, 
  mode, 
  setViewMode, 
  products, 
  bill, 
  onClose, 
  onRefresh, 
  actions 
}: TableModalProps) {
  
  if (!table) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 text-white">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-black italic text-orange-500 uppercase">Mesa {table.number}</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => { 
                if(confirm("Apagar mesa?")) 
                  api.delete(`/tables/${table.id}`).then(() => { onRefresh(); onClose(); }); 
              }} 
              className="text-rose-500"
            >
              <Trash2 />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={32}/></button>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {mode === 'MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => actions.addItem(p.id)} 
                  className="bg-slate-900/40 hover:bg-orange-600 p-6 rounded-3xl flex justify-between items-center border border-white/5 transition-all group text-left"
                >
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-orange-500 group-hover:text-white text-xs">R$ {Number(p.price).toFixed(2)}</p>
                  </div>
                  <ShoppingCart className="text-emerald-500 group-hover:text-white" />
                </button>
              ))}
              {/* 3. Aqui setViewMode já funcionará pois existe no componente */}
              <button onClick={() => setViewMode('OPTIONS')} className="w-full mt-4 text-slate-500 uppercase text-xs">Voltar</button>
            </div>
          )}

          {mode === 'BILL' && (
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5 space-y-2">
                {bill?.items.map((i: any) => (
                  <div key={i.id} className="flex justify-between italic text-slate-300">
                    <span>{i.quantity}x {i.product?.name}</span>
                    <b className="text-white font-mono">R$ {(i.unitPrice * i.quantity).toFixed(2)}</b>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-end border-t border-dashed border-slate-700">
                  <span className="font-black text-slate-500">TOTAL</span>
                  <span className="text-4xl font-black text-emerald-500 font-mono">R$ {bill.total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={actions.closeOrder} className="w-full bg-emerald-600 py-5 rounded-2xl font-black text-xl hover:bg-emerald-500 transition-all">PAGO / LIBERAR</button>
            </div>
          )}

          {mode === 'OPTIONS' && (
            <div className="grid gap-4">
              {table.status === 'FREE' ? (
                <button 
                  onClick={actions.openTable} 
                  className="w-full bg-emerald-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-emerald-900/20"
                >
                  <PlusCircle size={32} /> ABRIR MESA
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setViewMode('MENU')} 
                    className="w-full bg-orange-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-orange-900/20"
                  >
                    <Utensils size={40} /> LANÇAR ITENS
                  </button>
                  <button 
                    onClick={actions.viewBill} 
                    className="w-full bg-slate-700 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-600 transition-colors"
                  >
                    <Receipt size={24} /> CONTA
                  </button>
                  <button 
                    onClick={() => { 
                      if(confirm("Forçar reset?")) 
                        api.patch(`/tables/${table.id}/reset`).then(() => { onRefresh(); onClose(); }); 
                    }} 
                    className="mt-4 text-[10px] text-slate-600 uppercase tracking-widest text-center"
                  >
                    <AlertTriangle size={12} className="inline mr-1" /> Forçar Reset de Segurança
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useKitchen } from '../hooks/useKitchen';
import { KitchenCard } from '../components/KitchenCard';
import { ChefHat, Loader2 } from 'lucide-react';

export default function KitchenView() {
  const { items, tables, loading, handleFinishItem } = useKitchen();

  if (loading && items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-orange-500 italic">
        <Loader2 className="animate-spin mr-2" /> Aquecendo a cozinha...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      {/* Header do Monitor */}
      <div className="flex justify-between items-center mb-12 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
            <ChefHat size={60} className="text-orange-600" />
            Monitor KDS
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 italic">Fila de Produção Realtime</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-900 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center">
            <span className="text-orange-500 text-4xl font-black italic">{items.length}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Itens Pendentes</span>
          </div>
        </div>
      </div>

      {/* Grid de Pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => {
          // Tradução do tableNumber (ID) para o número real da mesa
          const tableInfo = tables.find(t => t.id === item.tableNumber || t.id === item.order?.tableId);
          const displayTable = tableInfo ? tableInfo.number : "??";

          return (
            <KitchenCard 
              key={item.id}
              item={item}
              tableNumber={displayTable}
              onFinish={handleFinishItem}
            />
          );
        })}
      </div>

      {/* Estado Vazio */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-800">
          <ChefHat size={120} strokeWidth={1} className="opacity-10 mb-6" />
          <p className="text-3xl font-black italic uppercase tracking-[0.2em]">Cozinha sem pedidos</p>
          <p className="text-slate-600 font-bold mt-2">Tudo em dia por aqui!</p>
        </div>
      )}
    </div>
  );
}
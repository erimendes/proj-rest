import { useTables } from '../hooks/useTables';
import { TableModal } from '../components/TableModal';
import { Users, PlusCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function TablesView() {
  const { 
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder 
  } = useTables();

  if (loading && tables.length === 0) return <div className="flex h-screen items-center justify-center bg-slate-900 text-white italic"><Loader2 className="animate-spin mr-2" /> Sincronizando...</div>;

  return (
    <div className="p-8 w-full min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mapa de Mesas</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 italic">Gerenciamento de Salão</p>
        </div>
        
        <button 
          onClick={() => { 
            const num = prompt("Número da nova mesa:"); 
            
            if (num) { 
              api.post('/tables', { number: Number(num) })
                .then(() => { 
                  // Caso de SUCESSO
                  alert(`Mesa ${num} criada com sucesso!`); 
                  loadTables(); 
                })
                .catch((error) => {
                  // Caso de ERRO (Aqui é onde o alerta será gerado se falhar)
                  console.error("Erro ao criar mesa:", error);
                  alert(`Erro: Não foi possível criar a mesa ${num}. Verifique se ela já existe ou tente novamente.`);
                });
            }
          }} 
          className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
        >
          <PlusCircle size={24} /> NOVA MESA
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start"> 
        {tables.map((table) => (
          <button 
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`w-44 h-44 rounded-[3rem] flex flex-col items-center justify-center border-b-8 transition-all active:scale-95 shadow-2xl relative group ${
              table.status === 'FREE' 
              ? 'bg-emerald-500/10 border-emerald-600 text-emerald-500 hover:bg-emerald-500/20' 
              : 'bg-rose-500/10 border-rose-600 text-rose-500 hover:bg-rose-500/20'
            }`}
          >
            <span className="text-xs font-black uppercase opacity-40 tracking-widest">Mesa</span>
            <span className="text-7xl font-black leading-none">{table.number}</span>
            <div className="flex items-center gap-1 mt-2 bg-black/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
              <Users size={12} /> {table.status}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <TableModal 
        table={selectedTable}
        mode={viewMode}
        setMode={setViewMode}
        products={products}
        bill={billDetails}
        onClose={closeModal}
        onRefresh={loadTables}
        actions={{
          openTable: handleOpenTable,
          addItem: handleAddItem,
          viewBill: handleViewBill,
          closeOrder: handleCloseOrder
        }}
      />
    </div>
  );
}
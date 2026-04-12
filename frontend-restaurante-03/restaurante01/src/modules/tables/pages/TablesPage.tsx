import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Plus, LayoutGrid, Loader2, Hash } from 'lucide-react';
import { getTablesRequest, createTableRequest } from '../services/tableService';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadTables() {
    setLoading(true);
    try {
      const res = await getTablesRequest();
      setTables(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar mesas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTables(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!tableNumber) return;

    setIsSubmitting(true);
    try {
      // Converte para número antes de enviar, conforme seu log de POST
      await createTableRequest(Number(tableNumber));
      setTableNumber('');
      setShowModal(false);
      await loadTables(); // Atualiza a lista após criar
    } catch (err) {
      alert("Erro ao criar mesa. Verifique se o número já existe.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <LayoutGrid className="text-orange-500" /> MESAS
          </h1>
          <p className="text-slate-500">Gerenciamento em tempo real do salão.</p>
        </div>
        <div className="w-full md:w-auto">
          <Button onClick={() => setShowModal(true)}>
            <Plus size={20} /> NOVA MESA
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p>Sincronizando com servidor...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div key={table.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-orange-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 text-orange-500 rounded-2xl">
                  <Hash size={20} />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
                  table.status === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {table.status}
                </span>
              </div>
              <h3 className="text-xl font-bold">Mesa {table.number}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Nova Mesa</h2>
            <p className="text-slate-500 text-sm mb-6">Insira o número de identificação da mesa.</p>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500">Número da Mesa</label>
                <Input 
                  type="number" 
                  placeholder="Ex: 10" 
                  value={tableNumber} 
                  onChange={(e: any) => setTableNumber(e.target.value)}
                  autoFocus
                  required 
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 p-3 text-slate-400 font-bold hover:text-white transition-colors"
                >
                  CANCELAR
                </button>
                <div className="flex-1">
                  <Button type="submit" loading={isSubmitting}>CRIAR</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

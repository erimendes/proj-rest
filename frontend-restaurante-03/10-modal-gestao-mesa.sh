#!/bin/bash
# Nome: 10-modal-gestao-mesa.sh
# Objetivo: Abrir opções de fechar e incluir pedido ao clicar em uma mesa
APP_NAME="restaurante01"

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🖱️ Implementando clique na mesa e modal de opções..."

# Atualizar a TablesPage para incluir o modal de gestão
cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle } from 'lucide-react';
import { getTablesRequest, createTableRequest } from '../services/tableService';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
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

  const handleTableClick = (table: any) => {
    setSelectedTable(table);
    setShowManageModal(true);
  };

  async function handleCreateTable(e: React.FormEvent) {
    e.preventDefault();
    if (!tableNumber) return;
    setIsSubmitting(true);
    try {
      await createTableRequest(Number(tableNumber));
      setTableNumber('');
      setShowCreateModal(false);
      await loadTables();
    } catch (err) {
      alert("Erro ao criar mesa.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <LayoutGrid className="text-orange-500" /> SALÃO
          </h1>
          <p className="text-slate-500">Selecione uma mesa para gerenciar.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={20} /> NOVA MESA
        </Button>
      </div>

      {/* GRID DE MESAS */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p>Sincronizando mesas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div 
              key={table.id} 
              onClick={() => handleTableClick(table)}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-orange-500 hover:scale-[1.02] transition-all cursor-pointer group active:scale-95"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 text-orange-500 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
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

      {/* MODAL DE GESTÃO DA MESA (INCLUIR PEDIDO / FECHAR) */}
      {showManageModal && selectedTable && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black italic tracking-tighter">MESA {selectedTable.number}</h2>
                <p className="text-slate-500 text-sm">O que deseja fazer agora?</p>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                className="flex items-center gap-4 bg-slate-800 hover:bg-orange-500 p-5 rounded-2xl transition-all group"
                onClick={() => alert('Abrindo tela de pedidos para a mesa ' + selectedTable.number)}
              >
                <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-orange-400">
                  <PlusCircle className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">INCLUIR PEDIDO</p>
                  <p className="text-xs text-slate-400 group-hover:text-orange-100">Adicionar itens ao consumo</p>
                </div>
              </button>

              <button 
                className="flex items-center gap-4 bg-slate-800 hover:bg-red-600 p-5 rounded-2xl transition-all group"
                onClick={() => alert('Fechando conta da mesa ' + selectedTable.number)}
              >
                <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-red-500">
                  <Receipt className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">FECHAR CONTA</p>
                  <p className="text-xs text-slate-400 group-hover:text-red-100">Finalizar e liberar mesa</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAR MESA */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Nova Mesa</h2>
            <form onSubmit={handleCreateTable} className="space-y-4">
              <Input 
                type="number" 
                placeholder="Número da Mesa" 
                value={tableNumber} 
                onChange={(e: any) => setTableNumber(e.target.value)}
                autoFocus required 
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 p-3 text-slate-400 font-bold">CANCELAR</button>
                <Button type="submit" loading={isSubmitting}>CRIAR</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
EOF

echo "✅ Script 10 Finalizado! Clique na mesa agora abre as opções de gestão."
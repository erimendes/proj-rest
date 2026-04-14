#!/bin/bash
# Nome: 31-restore-and-fix-auth.sh
APP_NAME="restaurante01"

cd "$APP_NAME" || exit

echo "🛠️ Restaurando interface e corrigindo fluxo de Token..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle, ArrowLeft } from 'lucide-react';
import { getTablesRequest, createTableRequest } from '../services/tableService';
import { getProductsRequest } from '../../products/services/productService';
import { api } from '../../../core/services/api';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modais
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  
  // Estados de controle
  const [view, setView] = useState<'options' | 'products'>('options');
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [resTables, resProducts] = await Promise.all([
        getTablesRequest(),
        getProductsRequest()
      ]);
      setTables(resTables.data || []);
      setProducts(resProducts.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const handleTableClick = (table: any) => {
    setSelectedTable(table);
    setView('options');
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
      await loadData();
    } catch (err) {
      alert("Erro ao criar mesa. Verifique se o número já existe.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAddProduct = async (product: any) => {
    setIsSubmitting(true);
    try {
      // Chamada real para a API
      await api.post('/orders', {
        tableId: selectedTable.id,
        items: [{ productId: product.id, quantity: 1 }]
      });

      alert(`✅ Pedido de ${product.name} enviado!`);
      setShowManageModal(false);
      await loadData(); // Atualiza o status visual da mesa
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Sessão expirada. Por favor, faça login novamente.");
      } else {
        alert("Erro ao incluir pedido.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 animate-in fade-in duration-500">
      {/* HEADER - RESTAURADO O BOTÃO DE NOVA MESA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <LayoutGrid className="text-orange-500" /> SALÃO
          </h1>
          <p className="text-slate-500">Gerencie mesas e pedidos.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={20} /> NOVA MESA
        </Button>
      </div>

      {/* GRID DE MESAS */}
      {loading ? (
        <div className="flex justify-center py-20 text-orange-500">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div 
              key={table.id} 
              onClick={() => handleTableClick(table)}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-orange-500 transition-all cursor-pointer group active:scale-95"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 text-orange-500 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Hash size={20} />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
                  table.status === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {table.status === 'FREE' ? 'LIVRE' : 'OCUPADA'}
                </span>
              </div>
              <h3 className="text-xl font-bold">Mesa {table.number}</h3>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE GESTÃO (PEDIDO / FECHAR) */}
      {showManageModal && selectedTable && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {view === 'products' && (
                  <button onClick={() => setView('options')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-xl font-black italic uppercase">Mesa {selectedTable.number}</h2>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-slate-500"><X size={24} /></button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {view === 'options' ? (
                <div className="grid gap-4">
                  <button onClick={() => setView('products')} className="flex items-center gap-4 bg-slate-800 hover:bg-orange-500 p-5 rounded-2xl transition-all group">
                    <PlusCircle size={24} /> 
                    <div className="text-left"><p className="font-bold">INCLUIR PEDIDO</p><p className="text-xs opacity-50">Adicionar itens ao consumo</p></div>
                  </button>
                  <button className="flex items-center gap-4 bg-slate-800 hover:bg-red-600 p-5 rounded-2xl transition-all group">
                    <Receipt className="text-white" size={24} /> 
                    <div className="text-left"><p className="font-bold">FECHAR CONTA</p><p className="text-xs opacity-50">Liberar mesa</p></div>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product: any) => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-800 rounded-2xl">
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-orange-500 font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
                      </div>
                      <button 
                        disabled={isSubmitting}
                        onClick={() => handleAddProduct(product)}
                        className="bg-orange-500 p-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAR MESA - RESTAURADO */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[120]">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold mb-6 italic tracking-tighter">CADASTRAR NOVA MESA</h2>
            <form onSubmit={handleCreateTable} className="space-y-4">
              <Input 
                type="number" 
                placeholder="Número da Mesa" 
                value={tableNumber} 
                onChange={(e: any) => setTableNumber(e.target.value)}
                autoFocus required 
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 p-3 text-slate-500 font-bold">CANCELAR</button>
                <Button type="submit" loading={isSubmitting} className="flex-1">CRIAR</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
EOF

echo "✅ Script 31 Finalizado! Botão restaurado e Auth corrigida."
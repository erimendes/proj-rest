#!/bin/bash
# Nome: 12-frontend-api-connection.sh
APP_NAME="restaurante01"

cd "$APP_NAME" || exit

echo "🔗 Conectando botões do salão à API real..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getTablesRequest } from '../services/tableService';
import { getProductsRequest } from '../../products/services/productService';
import { api } from '../../../core/services/api';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const [view, setView] = useState<'options' | 'products'>('options');
  const [selectedTable, setSelectedTable] = useState<any>(null);
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

  // --- AQUI ESTÁ A CORREÇÃO REAL ---
  const handleAddProduct = async (product: any) => {
    setIsSubmitting(true);
    try {
      // Faz a chamada real para o backend
      await api.post('/orders', {
        tableId: selectedTable.id,
        items: [{ productId: product.id, quantity: 1 }]
      });

      alert(`✅ ${product.name} incluído na Mesa ${selectedTable.number}!`);
      setShowManageModal(false);
      loadData(); // Recarrega para atualizar o status da mesa no mapa
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao incluir pedido";
      alert(`❌ Erro: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <LayoutGrid className="text-orange-500" /> SALÃO
          </h1>
          <p className="text-slate-500">Clique em uma mesa para gerenciar pedidos.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* MODAL DE GESTÃO */}
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
                <h2 className="text-xl font-black italic">MESA {selectedTable.number}</h2>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-slate-500"><X size={24} /></button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {view === 'options' ? (
                <div className="grid gap-4">
                  <button onClick={() => setView('products')} className="flex items-center gap-4 bg-slate-800 hover:bg-orange-500 p-5 rounded-2xl transition-all group">
                    <PlusCircle size={24} /> 
                    <div className="text-left"><p className="font-bold">INCLUIR PEDIDO</p><p className="text-xs opacity-50">Adicionar itens à comanda</p></div>
                  </button>
                  <button className="flex items-center gap-4 bg-slate-800 hover:bg-red-600 p-5 rounded-2xl transition-all group">
                    <Receipt size={24} /> 
                    <div className="text-left"><p className="font-bold">FECHAR CONTA</p><p className="text-xs opacity-50">Finalizar e liberar mesa</p></div>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product: any) => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-800 rounded-2xl hover:border-orange-500/50 transition-colors">
                      <div>
                        <p className="font-bold text-white">{product.name}</p>
                        <p className="text-orange-500 font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
                      </div>
                      <button 
                        disabled={isSubmitting}
                        onClick={() => handleAddProduct(product)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-all disabled:opacity-50"
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
    </div>
  );
}
EOF

echo "✅ Frontend sincronizado! Agora o botão realmente grava no banco de dados."
#!/bin/bash
# Nome: 11-fluxo-pedidos.sh
# Objetivo: Permitir selecionar produtos ao clicar em "Incluir Pedido"
APP_NAME="restaurante01"

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🛒 Implementando fluxo de seleção de produtos na mesa..."

# Atualizar a TablesPage para incluir a lógica de pedidos
cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getTablesRequest, createTableRequest } from '../services/tableService';
import { getProductsRequest } from '../../products/services/productService';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [view, setView] = useState<'options' | 'products'>('options'); // Controle de tela no modal
  
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

  const handleAddProduct = (product: any) => {
    // Aqui no futuro faremos o POST para /orders ou /items
    console.log(`Adicionando ${product.name} na Mesa ${selectedTable.number}`);
    alert(`${product.name} adicionado à Mesa ${selectedTable.number}!`);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <LayoutGrid className="text-orange-500" /> SALÃO
          </h1>
          <p className="text-slate-500">Gerencie mesas e pedidos em tempo real.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}><Plus size={20} /> MESA</Button>
      </div>

      {/* GRID DE MESAS */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div key={table.id} onClick={() => handleTableClick(table)} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-orange-500 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 text-orange-500 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors"><Hash size={20} /></div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${table.status === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{table.status}</span>
              </div>
              <h3 className="text-xl font-bold">Mesa {table.number}</h3>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DINÂMICO DE GESTÃO */}
      {showManageModal && selectedTable && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header do Modal */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-4">
                {view === 'products' && (
                  <button onClick={() => setView('options')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><ArrowLeft size={20} /></button>
                )}
                <div>
                  <h2 className="text-xl font-black italic tracking-tighter">MESA {selectedTable.number}</h2>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{view === 'options' ? 'Gerenciar' : 'Selecionar Produtos'}</p>
                </div>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto">
              {view === 'options' ? (
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setView('products')} className="flex items-center gap-4 bg-slate-800 hover:bg-orange-500 p-5 rounded-2xl transition-all group">
                    <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-orange-400"><PlusCircle className="text-white" size={24} /></div>
                    <div className="text-left"><p className="font-bold text-white">INCLUIR PEDIDO</p><p className="text-xs text-slate-400 group-hover:text-orange-100">Adicionar itens ao consumo</p></div>
                  </button>

                  <button className="flex items-center gap-4 bg-slate-800 hover:bg-red-600 p-5 rounded-2xl transition-all group">
                    <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-red-500"><Receipt className="text-white" size={24} /></div>
                    <div className="text-left"><p className="font-bold text-white">FECHAR CONTA</p><p className="text-xs text-slate-400 group-hover:text-red-100">Finalizar e liberar mesa</p></div>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.length === 0 ? (
                    <p className="text-center text-slate-500 py-10">Nenhum produto cadastrado.</p>
                  ) : (
                    products.map((product: any) => (
                      <div key={product.id} className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors">
                        <div>
                          <p className="font-bold text-white">{product.name}</p>
                          <p className="text-sm text-orange-500 font-bold">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleAddProduct(product)}
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Footer do Modal (Apenas em produtos) */}
            {view === 'products' && (
              <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-center">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                   <ShoppingBag size={12} /> Selecione os itens para adicionar à comanda
                 </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
EOF

echo "✅ Script 11 Finalizado! O fluxo de pedidos agora lista produtos reais dentro do modal."
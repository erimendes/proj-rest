#!/bin/bash
APP_NAME="restaurante04"
cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🚀 Atualizando TablesPage com exibição de imagens nos produtos..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState, useCallback } from 'react';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { 
  Plus, 
  LayoutGrid, 
  Loader2, 
  X, 
  Receipt, 
  PlusCircle, 
  ArrowLeft, 
  Package, 
  Trash2, 
  ShoppingBag, 
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { getTablesRequest, createTableRequest, deleteTableRequest } from '../services/tableService';
import { getProductsRequest } from '../../products/services/productService';
import { api } from '../../../core/services/api';

export default function TablesPage() {
  // --- ESTADOS DE DADOS ---
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  
  // --- ESTADOS DE UI ---
  const [loading, setLoading] = useState(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [view, setView] = useState<'options' | 'products'>('options');
  
  // --- ESTADOS DE SELEÇÃO E FORMULÁRIO ---
  const [newTableNumber, setNewTableNumber] = useState('');
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [tableOrder, setTableOrder] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- BUSCA DE DADOS ---
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resTables, resProducts] = await Promise.all([
        getTablesRequest(),
        getProductsRequest()
      ]);
      setTables(resTables.data || []);
      setProducts(resProducts.data || []);
      
      const cats: string[] = ['TODOS'];
      resProducts.data?.forEach((p: any) => {
        if (p.category?.name && !cats.includes(p.category.name.toUpperCase())) {
          cats.push(p.category.name.toUpperCase());
        }
      });
      setCategories(cats);
    } catch (err) {
      console.error("Erro ao sincronizar salão:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTableOrder = async (tableId: string) => {
    try {
      const res = await api.get('/orders');
      const order = res.data.find((o: any) => 
        o.tableId === tableId && (o.status === 'PENDING' || o.status === 'PREPARING')
      );
      setTableOrder(order || null);
    } catch (err) {
      console.error("Erro ao buscar itens da mesa:", err);
    }
  };

  useEffect(() => { loadData(); }, [loadData]);

  // --- HANDLERS DE INTERAÇÃO ---
  const handleOpenManage = (table: any) => {
    setSelectedTable(table);
    setView('options');
    setShowManageModal(true);
    setSelectedProducts([]);
    if (table.status !== 'FREE') loadTableOrder(table.id);
    else setTableOrder(null);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleCreateTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber) return;
    setIsSubmitting(true);
    try {
      await createTableRequest(Number(newTableNumber));
      setShowCreateModal(false);
      setNewTableNumber('');
      loadData();
    } catch (err) {
      alert("Erro ao criar mesa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTable = async () => {
    if (!selectedTable || !window.confirm(`Deseja excluir permanentemente a Mesa ${selectedTable.number}?`)) return;
    setIsSubmitting(true);
    try {
      await deleteTableRequest(selectedTable.id);
      setShowManageModal(false);
      loadData();
    } catch (err) {
      alert("Ação negada: Esta mesa pode ter um pedido ativo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmItems = async () => {
    if (selectedProducts.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const itemsToAdd = selectedProducts.map(id => ({ productId: id, quantity: 1 }));
      
      if (selectedTable.status === 'FREE') {
        await api.post('/orders', { tableId: selectedTable.id, items: itemsToAdd });
      } else {
        const orderId = tableOrder?.id;
        if (orderId) {
          for (const item of itemsToAdd) {
            await api.post('/orders/add-item', { orderId, productId: item.productId, quantity: 1 });
          }
        } else {
          await api.post('/orders', { tableId: selectedTable.id, items: itemsToAdd });
        }
      }
      
      await loadTableOrder(selectedTable.id);
      loadData();
      setView('options');
      setSelectedProducts([]);
    } catch (err) {
      alert("Erro ao processar pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = activeCategory === 'TODOS' 
    ? products 
    : products.filter((p: any) => p.category?.name?.toUpperCase() === activeCategory);

  return (
    <div className="p-6 text-white min-h-screen bg-[#050505] font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER SALÃO */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black italic flex items-center gap-3 tracking-tighter uppercase">
          <LayoutGrid className="text-orange-500" size={36} /> Salão
        </h1>
        <div className="w-56">
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={20} strokeWidth={3} /> NOVA MESA
          </Button>
        </div>
      </div>

      {/* GRADE DE MESAS */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="animate-spin text-orange-500" size={48} />
          <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Sincronizando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tables.map((table: any) => (
            <div 
              key={table.id} 
              onClick={() => handleOpenManage(table)} 
              className="bg-[#0f111a] border border-white/5 p-8 rounded-[2.5rem] cursor-pointer hover:border-orange-500 transition-all active:scale-95 group shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                  table.status === 'FREE' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {table.status === 'FREE' ? 'LIVRE' : 'OCUPADA'}
                </span>
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter">MESA {table.number}</h3>
              <p className="text-slate-600 text-[10px] font-bold mt-2 group-hover:text-orange-500 transition-colors uppercase tracking-widest">Ver detalhes ➔</p>
            </div>
          ))}
        </div>
      )}

      {/* MODAL PRINCIPAL DE GESTÃO */}
      {showManageModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 z-[1000]">
          <div className="bg-[#0f111a] border border-white/5 rounded-[3rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#13151f]">
              <div className="flex items-center gap-6">
                {view === 'products' && (
                  <button onClick={() => setView('options')} className="p-3 bg-white/5 hover:bg-orange-500 rounded-2xl text-white transition-all">
                    <ArrowLeft size={24}/>
                  </button>
                )}
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">MESA {selectedTable?.number}</h2>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleDeleteTable} className="p-4 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                  <Trash2 size={24} />
                </button>
                <button onClick={() => setShowManageModal(false)} className="p-4 text-white/20 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                  <X size={32}/>
                </button>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-8 overflow-y-auto flex-1 no-scrollbar">
              {view === 'options' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Menu Lateral de Ações */}
                  <div className="lg:col-span-1 space-y-4">
                    <button onClick={() => setView('products')} className="w-full flex items-center gap-5 bg-white/5 hover:bg-orange-500 border border-white/5 p-8 rounded-[2rem] transition-all group text-left">
                      <PlusCircle size={40} className="text-orange-500 group-hover:text-white" />
                      <div>
                        <span className="block font-black text-xl italic uppercase tracking-tighter group-hover:text-white leading-none">Incluir</span>
                        <span className="text-[10px] font-black text-slate-500 group-hover:text-white/70 uppercase tracking-widest mt-1 block">Lançar itens</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-5 bg-white/5 hover:bg-red-600 border border-white/5 p-8 rounded-[2rem] transition-all group text-left">
                      <Receipt size={40} className="text-red-500 group-hover:text-white" />
                      <div>
                        <span className="block font-black text-xl italic uppercase tracking-tighter group-hover:text-white leading-none">Fechar</span>
                        <span className="text-[10px] font-black text-slate-500 group-hover:text-white/70 uppercase tracking-widest mt-1 block">Conta final</span>
                      </div>
                    </button>
                  </div>

                  {/* Detalhes de Consumo */}
                  <div className="lg:col-span-2 bg-white/5 rounded-[3rem] p-8 border border-white/5 flex flex-col min-h-[400px]">
                    <div className="flex items-center gap-3 mb-8">
                      <ShoppingBag className="text-orange-500" size={24} />
                      <h3 className="font-black italic text-sm uppercase tracking-[0.2em] text-white">Consumo Atual</h3>
                    </div>

                    {!tableOrder ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-700 italic">
                        <Package size={64} className="mb-4 opacity-10" />
                        <p className="uppercase font-black text-[10px] tracking-[0.3em]">Aguardando pedidos</p>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div className="space-y-3 mb-8 flex-1">
                          {tableOrder.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-5 rounded-[1.5rem] border border-white/5">
                              <div className="flex items-center gap-4">
                                <span className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black shadow-lg shadow-orange-500/20">{item.quantity}x</span>
                                <span className="text-white font-bold tracking-tight">{item.product?.name}</span>
                              </div>
                              <span className="text-orange-500 font-black text-lg tabular-nums">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.product?.price || 0) * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                        {/* TOTALIZADOR */}
                        <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-end">
                          <div>
                            <span className="block font-black italic text-xs uppercase text-slate-500 tracking-widest">Subtotal acumulado</span>
                            <span className="text-5xl font-black text-orange-500 tracking-tighter mt-1 block">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tableOrder.totalPrice || 0)}
                            </span>
                          </div>
                          <span className="text-slate-800 font-black text-[8px] uppercase mb-2 tracking-[0.5em]">Inventory System v3</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full relative">
                  {/* CATEGORIAS FILTRO */}
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                        className={`px-10 py-4 rounded-full text-xs font-black transition-all whitespace-nowrap shadow-xl ${
                          activeCategory === cat ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-white/5 text-slate-500 hover:bg-white/10'
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  
                  {/* GRID DE PRODUTOS COM IMAGENS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-32">
                    {filteredProducts.map((p: any) => {
                      const isSelected = selectedProducts.includes(p.id);
                      return (
                        <div 
                          key={p.id} 
                          onClick={() => toggleProductSelection(p.id)}
                          className={`group relative p-5 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center gap-5 ${
                            isSelected ? 'bg-orange-500/10 border-orange-500' : 'bg-white/5 border-transparent hover:border-white/5'
                          }`}
                        >
                          {/* IMAGEM DO PRODUTO */}
                          <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-black flex-shrink-0 border border-white/5 shadow-inner">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.name} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/5">
                                <ImageIcon size={32} />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-orange-500 text-[9px] font-black uppercase mb-1 block tracking-[0.2em] truncate">{p.category?.name}</span>
                            <h3 className="text-xl font-bold text-white leading-tight mb-1 truncate">{p.name}</h3>
                            <p className="text-orange-500 font-black italic text-2xl tracking-tighter tabular-nums">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                            </p>
                          </div>
                          <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all shadow-xl ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-white/5 text-transparent'
                          }`}>
                            <Check size={32} strokeWidth={4} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* BOTÃO CONFIRMAR CARRINHO */}
                  {selectedProducts.length > 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-[1100] animate-in slide-in-from-bottom-4 duration-300">
                      <Button onClick={handleConfirmItems} loading={isSubmitting} className="shadow-[0_20px_50px_rgba(234,88,12,0.4)] py-6 text-xl italic font-black">
                        CONFIRMAR ({selectedProducts.length}) ITENS
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CRIAÇÃO DE MESA */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[2000]">
          <form onSubmit={handleCreateTable} className="bg-[#0f111a] border border-white/10 p-12 rounded-[3.5rem] w-full max-w-md space-y-8 text-center shadow-2xl">
            <h2 className="text-3xl font-black italic text-white tracking-tighter">CADASTRAR MESA</h2>
            <Input 
              autoFocus 
              type="number" 
              label="Número Identificador" 
              placeholder="Ex: 12"
              value={newTableNumber} 
              onChange={e => setNewTableNumber(e.target.value)} 
              className="text-center text-5xl font-black p-8" 
            />
            <div className="flex flex-col gap-4">
              <Button type="submit" loading={isSubmitting}>CRIAR AGORA</Button>
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)} 
                className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.4em] transition-colors"
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
EOF

echo "✅ Imagens restauradas no grid de seleção da TablesPage!"
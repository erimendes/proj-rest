#!/bin/bash
# Nome: 05-salon-complete.sh
# Objetivo: Versão consolidada do Salão + Resumo de Execução
APP_NAME="restaurante04"

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🚀 Consolidando TablesPage.tsx (Versão Final Otimizada)..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid, Loader2, X, Receipt, PlusCircle, ArrowLeft, Package } from 'lucide-react';
import { getTablesRequest, createTableRequest } from '../services/tableService';
import { getProductsRequest } from '../../products/services/productService';
import { api } from '../../../core/services/api';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  
  const [loading, setLoading] = useState(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
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
      const allProducts = resProducts.data || [];
      setTables(resTables.data || []);
      setProducts(allProducts);

      const cats: string[] = ['TODOS'];
      allProducts.forEach((p: any) => {
        if (p.category?.name && !cats.includes(p.category.name.toUpperCase())) {
          cats.push(p.category.name.toUpperCase());
        }
      });
      setCategories(cats);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadData(); }, []);

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
      alert("Erro ao criar mesa");
    } finally { setIsSubmitting(false); }
  };

  const filteredProducts = activeCategory === 'TODOS' 
    ? products 
    : products.filter((p: any) => p.category?.name?.toUpperCase() === activeCategory);

  const handleAddProduct = async (product: any) => {
    setIsSubmitting(true);
    try {
      if (selectedTable.status === 'FREE') {
        await api.post('/orders', {
          tableId: selectedTable.id,
          items: [{ productId: product.id, quantity: 1 }]
        });
      } else {
        const res = await api.get('/orders');
        const openOrder = res.data.find((o: any) => o.tableId === selectedTable.id && (o.status === 'PENDING' || o.status === 'PREPARING'));
        if (openOrder) {
          await api.post('/orders/add-item', {
            orderId: openOrder.id,
            productId: product.id,
            quantity: 1
          });
        }
      }
      setShowManageModal(false);
      loadData();
    } catch (err: any) {
      alert(`❌ Erro: ${err.response?.data?.message || 'Falha ao processar'}`);
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#050505]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic flex items-center gap-2">
          <LayoutGrid className="text-orange-500" /> SALÃO
        </h1>
        
        <div className="w-48">
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={20}/> NOVA MESA
          </Button>
        </div>
      </div>

      {loading ? <Loader2 className="animate-spin text-orange-500 mx-auto" size={40} /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div key={table.id} onClick={() => { setSelectedTable(table); setView('options'); setShowManageModal(true); }} 
                 className="bg-[#0f111a] border border-white/5 p-6 rounded-[2rem] cursor-pointer hover:border-orange-500 transition-all">
              <span className={`text-[10px] font-black px-2 py-1 rounded ${table.status === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {table.status === 'FREE' ? 'LIVRE' : 'OCUPADA'}
              </span>
              <h3 className="text-xl font-bold mt-2">Mesa {table.number}</h3>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[120]">
          <form onSubmit={handleCreateTable} className="bg-[#0f111a] border border-white/10 p-8 rounded-[2rem] w-full max-w-sm">
            <h2 className="text-2xl font-black mb-6 italic text-center">CADASTRAR MESA</h2>
            <input 
              autoFocus
              type="number" 
              placeholder="Número da Mesa"
              value={newTableNumber}
              onChange={e => setNewTableNumber(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-6 outline-none focus:border-orange-500 text-center text-2xl font-bold"
            />
            <div className="flex flex-col gap-3">
              <Button type="submit" loading={isSubmitting}>
                CRIAR MESA
              </Button>
              <button type="button" onClick={() => setShowCreateModal(false)} className="p-2 font-bold text-white/30 hover:text-white transition-colors text-sm">
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}

      {showManageModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[110]">
          <div className="bg-[#0f111a] border border-white/5 rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {view === 'products' && (
                  <button onClick={() => setView('options')} className="p-2 hover:bg-white/5 rounded-full text-orange-500"><ArrowLeft/></button>
                )}
                <h2 className="text-2xl font-black italic tracking-tighter">MESA {selectedTable?.number}</h2>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-white/20 hover:text-white transition-colors"><X size={32}/></button>
            </div>
            <div className="p-8 overflow-y-auto">
              {view === 'options' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button onClick={() => { setView('products'); setActiveCategory('TODOS'); }} className="flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/50 p-12 rounded-[2rem] transition-all group">
                    <PlusCircle size={48} className="text-orange-500" />
                    <span className="font-black text-xl italic tracking-tighter">INCLUIR ITEM</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-red-500/10 border border-transparent hover:border-red-500/50 p-12 rounded-[2rem] transition-all group">
                    <Receipt size={48} className="text-red-500" />
                    <span className="font-black text-xl italic tracking-tighter">FECHAR CONTA</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full text-xs font-black transition-all ${activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((p: any) => (
                      <div key={p.id} className="relative bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{p.category?.name || 'OUTROS'}</span>
                          <Package className="text-white/10 group-hover:text-orange-500/50 transition-colors" size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{p.name}</h3>
                        <p className="text-orange-500 text-2xl font-black italic tracking-tighter">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                        </p>
                        
                        <div className="absolute bottom-6 right-6 w-14">
                          <Button 
                            onClick={() => handleAddProduct(p)} 
                            loading={isSubmitting}
                            className="rounded-2xl p-4"
                          >
                            {!isSubmitting && <Plus size={24}/>}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
EOF

# Criando tableService.ts para garantir que o serviço de mesas esteja presente
cat > src/modules/tables/services/tableService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const getTablesRequest = () => api.get('/tables');

// O seu backend espera { "number": 1 } conforme o log do POST
export const createTableRequest = (number: number) => 
  api.post('/tables', { number });
EOF

# Atualizando HomePage.tsx para importar e renderizar TablesPage
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
import TablesPage from '../../tables/pages/TablesPage';
// import ReportsPage from '../../reports/pages/ReportsPage';
import ProductsPage from '../../products/pages/ProductsPage';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-8 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'mesas' && <TablesPage />}
        {activeTab === 'produtos' && <ProductsPage />}
        {/* {activeTab === 'relatorios' && <ReportsPage />} */}
      </main>
    </div>
  );
}
EOF

# --- BLOCO DE RESUMO FINAL ---
echo ""
echo "------------------------------------------------------------"
echo "✅ CONSOLIDADO APLICADO COM SUCESSO!"
echo "------------------------------------------------------------"
echo "📦 ARQUIVO: TablesPage.tsx"
echo "🛠️  FUNCIONALIDADES INTEGRADAS:"
echo "   1. Nova Mesa (Modal de Cadastro Restaurado)"
echo "   2. Mapa de Salão (Filtro Livre/Ocupada por Cores)"
echo "   3. Gestão Inteligente (Abre pedido ou adiciona item)"
echo "   4. Categorias (Filtros dinâmicos estilo Chips)"
echo "   5. Design (Cards escuros com preço em destaque)"
echo "------------------------------------------------------------"
echo "🚀 Reinicie seu frontend e backend para testar o fluxo final!"
echo "------------------------------------------------------------"
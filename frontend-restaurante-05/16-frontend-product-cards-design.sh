#!/bin/bash
# Nome: 39-frontend-product-cards-design.sh
APP_NAME="restaurante01"

cd "$APP_NAME" || exit

echo "🎨 Aplicando design de cards escuros no modal de produtos..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle, ArrowLeft, Package } from 'lucide-react';
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
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadData(); }, []);

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
      alert(`✅ ${product.name} adicionado!`);
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

      {showManageModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[110]">
          <div className="bg-[#0f111a] border border-white/5 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {view === 'products' && (
                  <button onClick={() => setView('options')} className="p-2 hover:bg-white/5 rounded-full"><ArrowLeft/></button>
                )}
                <h2 className="text-2xl font-black italic tracking-tighter">MESA {selectedTable?.number}</h2>
              </div>
              <button onClick={() => setShowManageModal(false)} className="text-white/20 hover:text-white"><X size={32}/></button>
            </div>

            <div className="p-8 overflow-y-auto">
              {view === 'options' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button onClick={() => setView('products')} className="flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-orange-500 p-12 rounded-[2rem] transition-all group">
                    <PlusCircle size={48} className="text-orange-500 group-hover:text-white" />
                    <span className="font-black text-xl italic tracking-tighter">INCLUIR ITEM</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-red-600 p-12 rounded-[2rem] transition-all group">
                    <Receipt size={48} className="text-red-500 group-hover:text-white" />
                    <span className="font-black text-xl italic tracking-tighter">FECHAR CONTA</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p: any) => (
                    <div key={p.id} className="relative bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:border-orange-500/50 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {p.category?.name || 'PIZZAS'}
                        </span>
                        <Package className="text-white/10 group-hover:text-orange-500/50 transition-colors" size={20} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{p.name}</h3>
                      <p className="text-orange-500 text-2xl font-black italic tracking-tighter">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                      </p>

                      <button 
                        onClick={() => handleAddProduct(p)}
                        className="absolute bottom-6 right-6 bg-white/5 hover:bg-orange-500 text-white p-4 rounded-2xl transition-all active:scale-90"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin"/> : <Plus size={24}/>}
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

echo "✅ Design de cards aplicado no modal de inclusão!"
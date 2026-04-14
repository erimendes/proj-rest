#!/bin/bash
# Nome: 35-frontend-smart-orders.sh
APP_NAME="restaurante01"

cd "$APP_NAME" || exit

echo "🧠 Tornando a inclusão de produtos inteligente..."

cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid, Loader2, Hash, X, Receipt, PlusCircle, ArrowLeft } from 'lucide-react';
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

  const handleAddProduct = async (product: any) => {
    setIsSubmitting(true);
    try {
      if (selectedTable.status === 'FREE') {
        // MESA LIVRE: Cria um pedido novo
        await api.post('/orders', {
          tableId: selectedTable.id,
          items: [{ productId: product.id, quantity: 1 }]
        });
        alert(`✅ Pedido aberto e ${product.name} adicionado!`);
      } else {
        // MESA OCUPADA: Adiciona item ao pedido existente
        // 1. Primeiro buscamos qual é o ID do pedido aberto para essa mesa
        const res = await api.get(`/orders/pending`); // Endpoint que você já tem no service
        const openOrder = res.data.find((o: any) => o.tableId === selectedTable.id);

        if (!openOrder) {
          // Caso a mesa esteja ocupada mas não achemos o pedido (segurança)
          await api.post('/orders', {
            tableId: selectedTable.id,
            items: [{ productId: product.id, quantity: 1 }]
          });
        } else {
          // 2. Chama o método de adicionar item (usando o endpoint de PATCH ou POST específico que você tiver)
          // Se o seu service usa o addItem(dto: AddItemDto), a rota costuma ser algo como:
          await api.post(`/orders/add-item`, {
            orderId: openOrder.id,
            productId: product.id,
            quantity: 1
          });
        }
        alert(`✅ ${product.name} adicionado à conta existente!`);
      }

      setShowManageModal(false);
      loadData();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao processar";
      alert(`❌ Erro 400: ${msg}`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* O conteúdo do seu salão continua aqui... (A mesma estrutura do Script 31) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic text-white flex items-center gap-2">
          <LayoutGrid className="text-orange-500" /> SALÃO
        </h1>
      </div>

      {loading ? <Loader2 className="animate-spin text-orange-500 mx-auto" size={40} /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tables.map((table: any) => (
            <div key={table.id} onClick={() => handleTableClick(table)} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl cursor-pointer hover:border-orange-500 transition-all">
              <span className={`text-[10px] font-black px-2 py-1 rounded ${table.status === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {table.status === 'FREE' ? 'LIVRE' : 'OCUPADA'}
              </span>
              <h3 className="text-xl font-bold mt-2">Mesa {table.number}</h3>
            </div>
          ))}
        </div>
      )}

      {showManageModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl">
             <div className="p-6 border-b border-slate-800 flex justify-between">
                <h2 className="text-xl font-black">MESA {selectedTable.number}</h2>
                <button onClick={() => setShowManageModal(false)}><X/></button>
             </div>
             <div className="p-6">
                {view === 'options' ? (
                  <Button onClick={() => setView('products')} className="w-full py-8 text-lg"><PlusCircle className="mr-2"/> INCLUIR ITEM</Button>
                ) : (
                  <div className="space-y-3">
                    {products.map((p: any) => (
                      <div key={p.id} className="flex justify-between p-4 bg-slate-800 rounded-2xl">
                        <span>{p.name}</span>
                        <button onClick={() => handleAddProduct(p)} className="bg-orange-500 p-2 rounded-lg"><Plus/></button>
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
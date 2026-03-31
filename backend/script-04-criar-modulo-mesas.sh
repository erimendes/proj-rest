#!/bin/bash

APP_NAME="inventario01"

cd $APP_NAME || { echo "❌ Projeto não encontrado"; exit 1; }

echo "🏗️ Organizando Módulo de Mesas na Arquitetura Modular..."

# 1. Criar estrutura de pastas conforme Imagem 2
mkdir -p src/modules/tables/pages
mkdir -p src/modules/tables/components
mkdir -p src/modules/tables/hooks

# 2. Criar o Hook de Lógica (useTables.ts)
echo "🧠 Criando Hook de lógica..."
cat > src/modules/tables/hooks/useTables.ts <<'EOF'
import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../core/services/api';

export function useTables() {
  const [tables, setTables] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'OPTIONS' | 'MENU' | 'BILL'>('OPTIONS');
  const [billDetails, setBillDetails] = useState<any>(null);

  const getUserId = () => {
    const data = localStorage.getItem('@Inventario:user');
    if (!data) return null;
    try {
      const parsed = JSON.parse(data);
      // O log mostrou que o campo se chama 'id', então pegamos 'parsed.id'
      return parsed.id; 
    } catch (e) {
      return null;
    }
  };

  const loadTables = useCallback(async () => {
    try {
      const res = await api.get('/tables');
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setTables(data.sort((a: any, b: any) => a.number - b.number));
    } catch (err) {
      console.error("Erro ao carregar mesas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTables();
    api.get('/products').then(res => setProducts(res.data));
    const interval = setInterval(loadTables, 10000);
    return () => clearInterval(interval);
  }, [loadTables]);

  const closeModal = () => {
    setSelectedTable(null);
    setViewMode('OPTIONS');
    setBillDetails(null);
  };

  const handleOpenTable = async () => {
    if (!selectedTable) return;
    
    const userId = getUserId();
    
    // Verificação de formato básico de UUID (opcional, mas ajuda no debug)
    if (!userId || userId.length < 30) {
      alert("❌ Erro: O ID do usuário não é um UUID válido. Por favor, faça login novamente.");
      return;
    }

    try {
      await api.post('/orders', { 
        tableId: selectedTable.id, 
        userId: userId 
      });
      alert(`Mesa ${selectedTable.number} aberta com sucesso!`);
      loadTables();
      closeModal();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro no servidor.";
      alert(`Erro: ${Array.isArray(errorMsg) ? errorMsg[0] : errorMsg}`);
    }
  };

  const handleAddItem = async (productId: string) => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;
      if (!order) return alert("Abra a mesa primeiro.");
      await api.post('/orders/add-item', { orderId: order.id, productId, quantity: 1 });
      alert("Item adicionado!");
    } catch (err) { alert("Erro ao adicionar item."); }
  };

  const handleViewBill = async () => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;
      if (!order || !order.items?.length) {
        if (confirm("Mesa vazia. Liberar?")) {
          await api.patch(`/tables/${selectedTable.id}/reset`);
          loadTables(); closeModal();
        }
        return;
      }
      const total = order.items.reduce((acc: number, item: any) => acc + (Number(item.unitPrice || 0) * item.quantity), 0);
      setBillDetails({ ...order, total });
      setViewMode('BILL');
    } catch (err) { alert("Erro ao carregar conta."); }
  };

  const handleCloseOrder = async () => {
    if (!billDetails?.id) return;
    if (!confirm("Fechar conta?")) return;
    try {
      await api.patch(`/orders/${billDetails.id}/close`);
      alert("Mesa liberada!");
      loadTables(); closeModal();
    } catch (err) { alert("Erro ao fechar conta."); }
  };

  return {
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder
  };
}
EOF

# 3. Criar o Componente Modal (TableModal.tsx)
echo "🗔 Criando Componente Modal..."
cat > src/modules/tables/components/TableModal.tsx <<'EOF'
import { X, Trash2, ShoppingCart, Utensils, Receipt, AlertTriangle, PlusCircle } from 'lucide-react';
import { api } from '../../../core/services/api';

interface TableModalProps {
  table: any; 
  mode: 'OPTIONS' | 'MENU' | 'BILL';
  // 1. Mudamos o nome na interface para bater com o uso interno
  setViewMode: (m: 'OPTIONS' | 'MENU' | 'BILL') => void; 
  products: any[]; 
  bill: any;
  onClose: () => void; 
  onRefresh: () => void;
  actions: { 
    openTable: () => void; 
    addItem: (id: string) => void; 
    viewBill: () => void; 
    closeOrder: () => void; 
  };
}

// 2. Agora recebemos setViewMode corretamente via props
export function TableModal({ 
  table, 
  mode, 
  setViewMode, 
  products, 
  bill, 
  onClose, 
  onRefresh, 
  actions 
}: TableModalProps) {
  
  if (!table) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 text-white">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-black italic text-orange-500 uppercase">Mesa {table.number}</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => { 
                if(confirm("Apagar mesa?")) 
                  api.delete(`/tables/${table.id}`).then(() => { onRefresh(); onClose(); }); 
              }} 
              className="text-rose-500"
            >
              <Trash2 />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={32}/></button>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {mode === 'MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => actions.addItem(p.id)} 
                  className="bg-slate-900/40 hover:bg-orange-600 p-6 rounded-3xl flex justify-between items-center border border-white/5 transition-all group text-left"
                >
                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-orange-500 group-hover:text-white text-xs">R$ {Number(p.price).toFixed(2)}</p>
                  </div>
                  <ShoppingCart className="text-emerald-500 group-hover:text-white" />
                </button>
              ))}
              {/* 3. Aqui setViewMode já funcionará pois existe no componente */}
              <button onClick={() => setViewMode('OPTIONS')} className="w-full mt-4 text-slate-500 uppercase text-xs">Voltar</button>
            </div>
          )}

          {mode === 'BILL' && (
            <div className="space-y-6">
              <div className="bg-black/20 p-6 rounded-3xl border border-white/5 space-y-2">
                {bill?.items.map((i: any) => (
                  <div key={i.id} className="flex justify-between italic text-slate-300">
                    <span>{i.quantity}x {i.product?.name}</span>
                    <b className="text-white font-mono">R$ {(i.unitPrice * i.quantity).toFixed(2)}</b>
                  </div>
                ))}
                <div className="pt-4 flex justify-between items-end border-t border-dashed border-slate-700">
                  <span className="font-black text-slate-500">TOTAL</span>
                  <span className="text-4xl font-black text-emerald-500 font-mono">R$ {bill.total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={actions.closeOrder} className="w-full bg-emerald-600 py-5 rounded-2xl font-black text-xl hover:bg-emerald-500 transition-all">PAGO / LIBERAR</button>
            </div>
          )}

          {mode === 'OPTIONS' && (
            <div className="grid gap-4">
              {table.status === 'FREE' ? (
                <button 
                  onClick={actions.openTable} 
                  className="w-full bg-emerald-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-emerald-900/20"
                >
                  <PlusCircle size={32} /> ABRIR MESA
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setViewMode('MENU')} 
                    className="w-full bg-orange-600 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-xl shadow-orange-900/20"
                  >
                    <Utensils size={40} /> LANÇAR ITENS
                  </button>
                  <button 
                    onClick={actions.viewBill} 
                    className="w-full bg-slate-700 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-600 transition-colors"
                  >
                    <Receipt size={24} /> CONTA
                  </button>
                  <button 
                    onClick={() => { 
                      if(confirm("Forçar reset?")) 
                        api.patch(`/tables/${table.id}/reset`).then(() => { onRefresh(); onClose(); }); 
                    }} 
                    className="mt-4 text-[10px] text-slate-600 uppercase tracking-widest text-center"
                  >
                    <AlertTriangle size={12} className="inline mr-1" /> Forçar Reset de Segurança
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
EOF

# 4. Criar a Página Principal (TablesPage.tsx)
echo "🖼️ Criando Página Principal..."
cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useTables } from '../hooks/useTables';
import { TableModal } from '../components/TableModal';
import { Users, PlusCircle, Loader2 } from 'lucide-react';
import { api } from '../../../core/services/api';

export default function TablesPage() {
  const { 
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder 
  } = useTables();

  if (loading && tables.length === 0) return <div className="flex h-screen items-center justify-center bg-slate-900 text-white italic"><Loader2 className="animate-spin mr-2" /> Sincronizando...</div>;

  return (
    <div className="p-8 w-full min-h-screen bg-slate-900 text-white">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mapa de Mesas</h1>
        <button 
          onClick={() => { 
            const num = prompt("Número da mesa:"); 
            if (num) api.post('/tables', { number: Number(num) }).then(() => loadTables());
          }} 
          className="bg-emerald-600 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-500 transition-all"
        >
          <PlusCircle size={24} /> NOVA MESA
        </button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center sm:justify-start"> 
        {tables.map((table) => (
          <button 
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`w-44 h-44 rounded-[3rem] flex flex-col items-center justify-center border-b-8 transition-all active:scale-95 shadow-2xl relative ${
              table.status === 'FREE' 
              ? 'bg-emerald-500/10 border-emerald-600 text-emerald-500 hover:bg-emerald-500/20' 
              : 'bg-rose-500/10 border-rose-600 text-rose-500 hover:bg-rose-500/20'
            }`}
          >
            <span className="text-xs font-black uppercase opacity-40 tracking-widest">Mesa</span>
            <span className="text-7xl font-black leading-none">{table.number}</span>
            <div className="flex items-center gap-1 mt-2 bg-black/30 px-3 py-1 rounded-full text-[10px] font-bold">
              <Users size={12} /> {table.status}
            </div>
          </button>
        ))}
      </div>

      <TableModal 
        table={selectedTable} mode={viewMode} setViewMode={setViewMode}
        products={products} bill={billDetails} onClose={closeModal} onRefresh={loadTables}
        actions={{ openTable: handleOpenTable, addItem: handleAddItem, viewBill: handleViewBill, closeOrder: handleCloseOrder }}
      />
    </div>
  );
}
EOF

# 5. Atualizar Sidebar (DashboardLayout.tsx)
echo "🔗 Atualizando Sidebar..."
# Só adiciona se 'LayoutGrid' não estiver no arquivo
if ! grep -q "LayoutGrid" src/shared/layouts/DashboardLayout.tsx; then
    sed -i "s/Tags, Menu, X/Tags, Menu, X, LayoutGrid/" src/shared/layouts/DashboardLayout.tsx
fi

if ! grep -q "path: '/mesas'" src/shared/layouts/DashboardLayout.tsx; then
    sed -i "/label: 'Usuários'/a \    { label: 'Mesas', icon: LayoutGrid, path: '/mesas' }," src/shared/layouts/DashboardLayout.tsx
fi

# 6. Atualizar Rotas (index.tsx)
echo "🛤️ Configurando Rotas..."
# Só adiciona o import se 'TablesPage' não estiver declarado
if ! grep -q "import TablesPage" src/routes/index.tsx; then
    sed -i "/import UsersPage/a import TablesPage from '../modules/tables/pages/TablesPage';" src/routes/index.tsx
fi

# Só adiciona a rota se '/mesas' não estiver no arquivo
if ! grep -q "path=\"/mesas\"" src/routes/index.tsx; then
    sed -i "/path=\"\/usuarios\"/a \          <Route path=\"/mesas\" element={<TablesPage />} />" src/routes/index.tsx
fi

echo "✅ Módulo de Mesas verificado e integrado!"
echo "---------------------------------------------------"
echo "🚀 Reinicie o servidor: npm run dev"
echo "---------------------------------------------------"
echo "📌 Dica: Acesse http://localhost:5174/mesas para visualizar o módulo de mesas."


#!/bin/bash

APP_NAME="inventario01"
HOOK_PATH="src/modules/tables/hooks/useTables.ts"

cd $APP_NAME || { echo "❌ Projeto não encontrado"; exit 1; }

echo "🔐 Integrando ID do usuário logado no Hook de Mesas..."

cat > $HOOK_PATH <<'EOF'
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

echo "✅ Hook atualizado com sucesso!"
echo "---------------------------------------------------"
echo "🚀 Reinicie o servidor: npm run dev"
echo "---------------------------------------------------"
echo "📌 Dica: Acesse http://localhost:5174/mesas para visualizar o módulo de mesas."

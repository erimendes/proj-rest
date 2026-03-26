import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useTables() {
  const [tables, setTables] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'OPTIONS' | 'MENU' | 'BILL'>('OPTIONS');
  const [billDetails, setBillDetails] = useState<any>(null);

  const loadTables = useCallback(async () => {
    try {
      const res = await api.get('/tables');
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setTables(data.sort((a, b) => a.number - b.number));
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
    try {
      const userId = 'f461014f-9cec-42e5-9066-37b1d1d33ddb'; // ID de teste
      await api.post('/orders', { tableId: selectedTable.id, userId });
      alert(`Mesa ${selectedTable.number} aberta!`);
      loadTables();
      closeModal();
    } catch (err) {
      alert("Erro ao abrir mesa.");
    }
  };

  const handleAddItem = async (productId: string) => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;
      
      if (!order) {
        alert("Abra a mesa antes de lançar produtos.");
        return;
      }

      await api.post('/orders/add-item', { orderId: order.id, productId, quantity: 1 });
      alert("Produto lançado com sucesso!");
    } catch (err) {
      alert("Erro ao lançar produto.");
    }
  };

  const handleViewBill = async () => {
    try {
      const res = await api.get(`/orders/table/${selectedTable.id}`);
      const order = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!order || !order.items?.length) {
        if (window.confirm("Mesa sem itens. Deseja liberá-la agora?")) {
          if (order?.id) await api.patch(`/orders/${order.id}/close`);
          else await api.patch(`/tables/${selectedTable.id}/reset`);
          loadTables();
          closeModal();
        }
        return;
      }

      const total = order.items.reduce((acc: number, item: any) => 
        acc + (Number(item.unitPrice || item.product?.price || 0) * item.quantity), 0
      );

      setBillDetails({ ...order, total });
      setViewMode('BILL');
    } catch (err) {
      alert("Erro ao carregar conta.");
    }
  };

  const handleCloseOrder = async () => {
    if (!billDetails?.id) return;
    if (!window.confirm("Confirmar pagamento e liberar mesa?")) return;

    try {
      await api.patch(`/orders/${billDetails.id}/close`);
      alert("✅ Conta fechada com sucesso!");
      loadTables();
      closeModal();
    } catch (err) {
      alert("Erro ao fechar conta.");
    }
  };

  return {
    tables, products, selectedTable, loading, viewMode, billDetails,
    setSelectedTable, setViewMode, loadTables, closeModal,
    handleOpenTable, handleAddItem, handleViewBill, handleCloseOrder
  };
}
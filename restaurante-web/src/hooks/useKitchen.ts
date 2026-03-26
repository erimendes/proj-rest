import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useKitchen() {
  const [items, setItems] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Busca itens da fila e lista de mesas em paralelo
      const [itemsRes, tablesRes] = await Promise.all([
        api.get('/orders/kitchen/queue'),
        api.get('/tables')
      ]);
      
      setItems(itemsRes.data);
      setTables(tablesRes.data);
    } catch (err) {
      console.error("Erro ao carregar KDS:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleFinishItem = async (itemId: string) => {
    try {
      await api.patch(`/orders/item/${itemId}/ready`);
      // Remove da tela instantaneamente para dar sensação de velocidade
      setItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      alert("Erro ao finalizar item. Tente novamente.");
    }
  };

  return {
    items,
    tables,
    loading,
    handleFinishItem,
    refresh: fetchData
  };
}
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useDashboard() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    try {
      const res = await api.get('/orders/reports/sales');
      console.log("DADOS VINDOS DA API:", res.data); // 👈 ADICIONE ISSO
      setReport(res.data);
    } catch (err) {
      console.error("Erro ao carregar relatório:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const ticketMedio = report?.totalOrders > 0 
    ? (report.revenue / report.totalOrders).toFixed(2) 
    : "0.00";

  return {
    report,
    loading,
    ticketMedio,
    refresh: fetchReport
  };
}

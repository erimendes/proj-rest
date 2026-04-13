import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
import TablesPage from '../../tables/pages/TablesPage';
import ReportsPage from '../../reports/pages/ReportsPage';
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
        {activeTab === 'relatorios' && <ReportsPage />}
      </main>
    </div>
  );
}

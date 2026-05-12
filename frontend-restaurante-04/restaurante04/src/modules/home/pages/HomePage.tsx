import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
<<<<<<< HEAD
import TablesPage from '../../tables/pages/TablesPage';
// import ReportsPage from '../../reports/pages/ReportsPage';
import ProductsPage from '../../products/pages/ProductsPage';
=======
// import TablesPage from '../../tables/pages/TablesPage';
// import ReportsPage from '../../reports/pages/ReportsPage';
// import ProductsPage from '../../products/pages/ProductsPage';
>>>>>>> e678f64ebc5163927a86c79db1b3813e2b46f83f

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-8 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'mesas' && <TablesPage />}
        {activeTab === 'produtos' && <ProductsPage />}
<<<<<<< HEAD
        {/* {activeTab === 'relatorios' && <ReportsPage />} */}
=======
        {activeTab === 'relatorios' && <ReportsPage />}
>>>>>>> e678f64ebc5163927a86c79db1b3813e2b46f83f
      </main>
    </div>
  );
}

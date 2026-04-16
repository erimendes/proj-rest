#!/bin/bash
APP_NAME="restaurante04"

cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

echo "🛠️ Aplicando script de Produtos Otimizado..."

# 1. Garantir que o Service existe (Adicionado tipos para consistência)
cat > src/modules/products/services/productService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const getProductsRequest = () => api.get('/products');
export const getCategoriesRequest = () => api.get('/categories');
EOF

# 2. Página de Produtos Corrigida
cat > src/modules/products/pages/ProductsPage.tsx <<'EOF'
import { useEffect, useState, useCallback } from 'react';
import { Package, Loader2, AlertCircle, RefreshCcw, Image as ImageIcon } from 'lucide-react';
import { getProductsRequest, getCategoriesRequest } from '../services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setErrorInfo(null);
    console.log("🔍 Iniciando busca de dados...");

    try {
      // Executa as chamadas em paralelo para melhor performance
      const [resProd, resCat] = await Promise.all([
        getProductsRequest(),
        getCategoriesRequest()
      ]);

      console.log("✅ Dados recebidos com sucesso");
      setProducts(resProd.data || []);
      setCategories(resCat.data || []);

    } catch (err: any) {
      console.error("❌ Erro na API:", err.response?.data || err.message);
      setErrorInfo(
        err.response?.data?.message || 
        "Falha na comunicação com o servidor. Verifique se o Backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    loadData(); 
  }, [loadData]);

  const filteredProducts = selectedCat === 'Todos' 
    ? products 
    : products.filter((p: any) => p.category?.name === selectedCat);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <Loader2 className="animate-spin mb-4 text-orange-500" size={48} />
      <p className="font-bold italic">Consultando servidor...</p>
    </div>
  );

  if (errorInfo) return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-500/5 border border-red-500/20 rounded-3xl">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Erro de Conexão</h2>
      <p className="text-slate-400 max-w-md mb-6">{errorInfo}</p>
      <button 
        onClick={loadData}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black hover:bg-orange-500 hover:text-white transition-all"
      >
        <RefreshCcw size={18} /> TENTAR NOVAMENTE
      </button>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 text-white">
          <Package className="text-orange-500" /> PRODUTOS
        </h1>
        <p className="text-slate-500">Cardápio disponível para pedidos.</p>
      </div>

      {/* FILTRO DE CATEGORIAS */}
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCat('Todos')}
          className={`px-6 py-2 rounded-full font-bold text-xs transition-all border whitespace-nowrap ${
            selectedCat === 'Todos' 
              ? 'bg-orange-500 border-orange-500 text-white shadow-lg' 
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          TODOS
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.name)}
            className={`px-6 py-2 rounded-full font-bold text-xs transition-all border whitespace-nowrap ${
              selectedCat === cat.name 
                ? 'bg-orange-500 border-orange-500 text-white' 
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUTOS COM IMAGEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="bg-[#0f111a] border border-white/5 p-4 rounded-[2.5rem] hover:border-orange-500/50 transition-all flex items-center gap-4">
            {/* Thumbnail da Imagem */}
            <div className="w-20 h-20 rounded-2xl bg-slate-800 flex-shrink-0 overflow-hidden border border-white/5">
              {product.imageUrl ? (
                <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>

            <div className="flex-1">
               <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                {product.category?.name || 'Geral'}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight mb-1">{product.name}</h3>
              <p className="text-orange-500 font-black text-xl italic tracking-tighter">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <p className="text-slate-600 font-bold italic uppercase tracking-widest text-xs">Vazio por aqui...</p>
        </div>
      )}
    </div>
  );
}
EOF

# 3. HomePage (Sem alterações, apenas garantindo os imports)
cat > src/modules/home/pages/HomePage.tsx <<'EOF'
import { useState } from 'react';
import { Navbar } from '../../../shared/components/Navbar';
import { DashboardView } from '../components/DashboardView';
import ProductsPage from '../../products/pages/ProductsPage';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-8 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'produtos' && <ProductsPage />}
      </main>
    </div>
  );
}
EOF

echo "✅ Script corrigido e renderização de imagens adicionada!"
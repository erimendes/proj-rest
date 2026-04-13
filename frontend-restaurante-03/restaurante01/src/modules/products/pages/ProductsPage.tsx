import { useEffect, useState } from 'react';
import { Package, Loader2, Tag, AlertCircle, RefreshCcw } from 'lucide-react';
import { getProductsRequest, getCategoriesRequest } from '../services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setErrorInfo(null);
    console.log("🔍 Iniciando busca de dados...");

    try {
      // Carregando separadamente para identificar qual endpoint falha
      const resProd = await getProductsRequest().catch(err => {
        console.error("❌ Erro no GET /products:", err.response?.data || err.message);
        throw new Error("Falha ao carregar produtos (Erro 500 no Backend)");
      });
      console.log("✅ Produtos recebidos:", resProd.data);

      const resCat = await getCategoriesRequest().catch(err => {
        console.error("❌ Erro no GET /categories:", err.response?.data || err.message);
        throw new Error("Falha ao carregar categorias (Erro 500 no Backend)");
      });
      console.log("✅ Categorias recebidas:", resCat.data);

      setProducts(resProd.data || []);
      setCategories(resCat.data || []);

    } catch (err: any) {
      setErrorInfo(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

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
      <h2 className="text-xl font-bold text-white mb-2">Erro no Servidor (500)</h2>
      <p className="text-slate-400 max-w-md mb-6">{errorInfo}</p>
      <div className="bg-slate-950 p-4 rounded-lg text-left mb-6 w-full max-w-lg overflow-x-auto">
        <p className="text-xs font-mono text-red-400"># Dica de Debug:</p>
        <p className="text-xs font-mono text-slate-500 mt-2">1. Verifique o terminal do seu BACKEND agora.</p>
        <p className="text-xs font-mono text-slate-500">2. O banco de dados está rodando?</p>
        <p className="text-xs font-mono text-slate-500">3. A tabela 'products' ou 'categories' existe?</p>
      </div>
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
        <p className="text-slate-500">Gerencie os itens ativos no sistema.</p>
      </div>

      {/* SUBMENU DE CATEGORIAS */}
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCat('Todos')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all border whitespace-nowrap ${
            selectedCat === 'Todos' 
              ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-900/20' 
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

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-orange-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <span className="text-[10px] font-black bg-slate-800 text-orange-500 px-2 py-1 rounded-md uppercase border border-slate-700">
                {product.category?.name || 'Sem Categoria'}
              </span>
              <Package size={20} className="text-slate-700 group-hover:text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{product.name}</h3>
            <p className="text-orange-500 font-black text-lg">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </p>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <p className="text-slate-600">Nenhum item encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../../../core/services/api';
import { Package, Plus, Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erro ao buscar produtos", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Produtos</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer text-white">
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : products.length > 0 ? (
        <div className="grid gap-4">
          {products.map((p: any) => (
            <div key={p.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{p.name}</p>
                <p className="text-slate-400 text-sm">Estoque: {p.stock} | Preço: R$ {p.price}</p>
              </div>
              <span className="bg-slate-900 px-3 py-1 rounded-lg text-xs font-mono text-orange-400">{p.id.substring(0,8)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
          <Package className="mx-auto text-slate-600 mb-4" size={48} />
          <p className="text-slate-500 italic">Nenhum produto cadastrado no banco de dados.</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { api } from '../../../core/services/api';
import { Tags, Plus, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erro ao buscar categorias", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Categorias</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 cursor-white text-white">
          <Plus size={20} /> Nova Categoria
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c: any) => (
            <div key={c.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-xl text-orange-500"><Tags size={20}/></div>
              <span className="font-bold">{c.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
          <Tags className="mx-auto text-slate-600 mb-4" size={48} />
          <p className="text-slate-500 italic">Nenhuma categoria encontrada.</p>
        </div>
      )}
    </div>
  );
}

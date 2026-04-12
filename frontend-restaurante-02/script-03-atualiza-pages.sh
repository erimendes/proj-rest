#!/bin/bash
APP_NAME="inventario01"

cd $APP_NAME || { echo "❌ Projeto não encontrado"; exit 1; }

echo "📡 Conectando as páginas à API real..."

# 1. Atualizar Página de Produtos (src/modules/products/pages/ProductsPage.tsx)
cat > src/modules/products/pages/ProductsPage.tsx <<'EOF'
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
EOF

# 2. Atualizar Página de Categorias (src/modules/categories/pages/CategoriesPage.tsx)
cat > src/modules/categories/pages/CategoriesPage.tsx <<'EOF'
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
EOF

# 3. Atualizar Página de Usuários (src/modules/users/pages/UsersPage.tsx)
cat > src/modules/users/pages/UsersPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { api } from '../../../core/services/api';
import { Users, Plus, Loader2, ShieldCheck } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Erro ao buscar usuários", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Usuários</h2>
        <button className="bg-orange-600 hover:bg-orange-500 p-3 rounded-xl font-bold flex items-center gap-2 text-white">
          <Plus size={20} /> Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      ) : (
        <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-black">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Cargo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-bold">{u.name}</td>
                  <td className="p-4 text-slate-400">{u.email}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded-lg">
                      <ShieldCheck size={14}/> {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
EOF

echo "✅ Páginas atualizadas! Agora o Frontend consome as rotas do seu Controller."
#!/bin/bash
APP_NAME="restaurante01"
cd "$APP_NAME" || exit 1
echo "🪑 Criando módulo de Mesas..."

mkdir -p src/modules/tables/{pages,components,services}

# Service
cat > src/modules/tables/services/tableService.ts <<'EOF'
import { api } from '../../../core/services/api';
export const getTablesRequest = () => api.get('/tables');
export const createTableRequest = (number: string, capacity: number) => api.post('/tables', { number, capacity });
EOF

# Page
cat > src/modules/tables/pages/TablesPage.tsx <<'EOF'
import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Plus, LayoutGrid } from 'lucide-react';
import { getTablesRequest } from '../services/tableService';

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  useEffect(() => { getTablesRequest().then(res => setTables(res.data)).catch(() => {}); }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><LayoutGrid className="text-orange-500" /> MESAS</h1>
        <div className="w-48"><Button><Plus size={20} /> NOVA MESA</Button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tables.length === 0 && <div className="col-span-full py-10 text-center text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">Nenhuma mesa encontrada.</div>}
      </div>
    </div>
  );
}
EOF

echo "✅ Componente TablesPage criado em src/modules/tables/pages/TablesPage.tsx"
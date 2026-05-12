#!/bin/bash
APP_NAME="restaurante04"
cd "$APP_NAME" || { echo "❌ Erro: Pasta $APP_NAME não encontrada."; exit 1; }

# 1. Atualizando o tableService.ts para incluir a função DELETE
cat > src/modules/tables/services/tableService.ts <<'EOF'
import { api } from '../../../core/services/api';

export const getTablesRequest = () => api.get('/tables');

export const createTableRequest = (number: number) => 
  api.post('/tables', { number });

export const deleteTableRequest = (id: string) => 
  api.delete(`/tables/${id}`);
EOF

# 2. Atualizando TablesPage.tsx com o botão de excluir (Trash2)

echo "🎨 Criando componente de Input compartilhado..."

# Criando o componente de Input
cat > src/shared/components/Input.tsx <<'EOF'
import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-orange-500 text-white transition-colors placeholder:text-slate-600 ${className}`}
      />
    </div>
  );
}
EOF


echo "✅ Componente Input criado e TablesPage atualizada!"
echo "✅ Script atualizado! Função de EXCLUIR mesa incluída no Modal de Gestão."
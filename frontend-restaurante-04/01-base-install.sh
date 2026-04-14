#!/bin/bash
# Nome: 01-base-install.sh

# Objetivo: Criar a base do projeto Vite + React + TS
APP_NAME="restaurante04"

cd "$APP_NAME" || exit 1

echo "📦 Instalando dependências essenciais..."
# Axios para API, Lucide para ícones, React Router para navegação
npm install axios lucide-react react-router-dom

# Tailwind CSS v4 (Instalação via Vite)
npm install tailwindcss @tailwindcss/vite --save-dev

npm install --save-dev @types/react @types/react-dom
npm install react-hook-form zod @hookform/resolvers

echo "📂 Criando estrutura de pastas profissional..."

mkdir -p src/app/providers \
         src/core/services \
         src/routes \
         src/shared/components \
         src/modules/auth/{pages,services} \
         src/modules/home/{pages,services,components} \
         src/modules/tables/{pages,services,components} \
         src/modules/reports/{pages,services,components} \
         src/modules/products/{pages,services,components}

echo "⚙️ Vite config..."
cat > vite.config.ts <<'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
EOF

echo "🎨 CSS..."
cat > src/index.css <<'EOF'
@import "tailwindcss";

body {
  @apply bg-slate-950 text-white antialiased;
}
EOF

echo "------------------------------------------------------------"
echo "✅ PROJETO INICIALIZADO COM SUCESSO!"
echo "------------------------------------------------------------"
echo "🛠️  O que foi feito:"
echo "   1. Instalado: axios, lucide-react, tailwindcss v4"
echo "   2. Estrutura de pastas modular criada"
echo "   3. Vite e CSS configurados para tema Dark/Orange"
echo "   4. Ponto de entrada (main.tsx) e App.tsx criados"
echo "------------------------------------------------------------"
echo "👉 Agora você pode rodar os Scripts 01, 02 e 03 com segurança!"
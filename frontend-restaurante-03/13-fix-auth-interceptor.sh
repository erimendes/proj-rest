#!/bin/bash
# Nome: 34-super-fix-auth.sh
APP_NAME="restaurante01"

cd "$APP_NAME" || exit

echo "🚀 Aplicando Super Fix de Autenticação no Frontend..."

cat > src/core/services/api.ts <<'EOF'
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  // 1. Buscamos o token (tentando as duas chaves mais prováveis do seu sistema)
  const rawToken = localStorage.getItem('@Inventario:token') || localStorage.getItem('token');
  
  if (rawToken && config.headers) {
    // 2. CORREÇÃO CRÍTICA: Remove aspas duplas que o JSON.stringify costuma colocar
    // Se o token for "abc", o replace transforma em abc. 
    // Sem isso, o header vira "Bearer "abc"", o que o NestJS rejeita (401).
    const cleanToken = rawToken.replace(/"/g, '').trim();
    
    config.headers.Authorization = `Bearer ${cleanToken}`;
    
    // Log para você conferir no console se o token está saindo limpo
    console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
  } else {
    console.warn('⚠️ API: NENHUM TOKEN ENCONTRADO NO STORAGE!');
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚫 Bloqueado pelo Backend (401): Token inválido ou expirado.");
    }
    return Promise.reject(error);
  }
);
EOF

echo "✅ Arquivo api.ts atualizado! Tente incluir o pedido agora."
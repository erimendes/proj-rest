#!/bin/bash

URL="http://localhost:3000"
EMAIL="testador@automacao.com" # E-mail fixo para teste de idempotência

echo "🔥 Fluxo Automático com Proteção contra Duplicatas..."

# 1. CATEGORIA
CAT_RES=$(curl -s "$URL/categories")
CAT_ID=$(echo "$CAT_RES" | jq -r '.[] | select(.name=="Bebidas") | .id')

if [ -z "$CAT_ID" ] || [ "$CAT_ID" == "null" ]; then
  CAT_ID=$(curl -s -X POST $URL/categories -H "Content-Type: application/json" -d '{"name": "Bebidas"}' | jq -r '.id')
  echo "📦 Categoria 'Bebidas' criada."
fi

# 2. USUÁRIO (Tenta registrar; se der erro de duplicata, apenas faz login)
echo "👤 Verificando usuário $EMAIL..."
REG_RES=$(curl -s -X POST $URL/auth/register -H "Content-Type: application/json" \
  -d "{\"name\": \"Testador\", \"email\": \"$EMAIL\", \"password\": \"123456\", \"role\": \"WAITER\"}")

# 3. LOGIN (Sempre necessário para pegar o Token atualizado)
TOKEN_RES=$(curl -s -X POST $URL/auth/login -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"123456\"}")
TOKEN=$(echo "$TOKEN_RES" | jq -r '.access_token')
USER_ID=$(echo "$TOKEN_RES" | jq -r '.id')

if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "❌ Falha no login. Verifique as credenciais."
  exit 1
fi

echo "🔑 Token obtido com sucesso."

# 4. PRODUTO E MESA (Mesma lógica do script acima...)
# [Omitido por brevidade, mas segue a mesma lógica de select(.name=="...") do script 1]

echo "✨ Fluxo finalizado sem gerar lixo no banco de dados!"
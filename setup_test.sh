#!/bin/bash

URL="http://localhost:3000"

echo "🚀 Iniciando Setup de Testes..."

#########################################
# Função segura para extrair JSON (sem grep -P)
#########################################
extract() {
  echo "$1" | sed -n "s/.*\"$2\":\"\([^\"]*\)\".*/\1/p"
}

#########################################
# 1. CRIAR CATEGORIA
#########################################
echo "📦 Criando Categoria..."
CAT_RES=$(curl -s -X POST "$URL/categories" \
  -H "Content-Type: application/json" \
  -d '{"name": "Hambúrgueres"}')

echo "$CAT_RES"

CAT_ID=$(extract "$CAT_RES" "id")

if [ -z "$CAT_ID" ]; then
  echo "❌ Erro ao criar categoria"
  exit 1
fi

echo "✅ Categoria ID: $CAT_ID"

#########################################
# 2. CRIAR PRODUTO
#########################################
echo "🍔 Criando Produto..."

PROD_RES=$(curl -s -X POST "$URL/products" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Hambúrguer Artesanal\",
    \"description\": \"Pão brioche, 180g\",
    \"price\": 35.90,
    \"categoryId\": \"$CAT_ID\"
  }")

echo "$PROD_RES"

PROD_ID=$(extract "$PROD_RES" "id")

#########################################
# 3. CRIAR MESA
#########################################
echo "🪑 Criando Mesa..."

TABLE_RES=$(curl -s -X POST "$URL/tables" \
  -H "Content-Type: application/json" \
  -d '{"number": 11}')

echo "$TABLE_RES"

TABLE_ID=$(extract "$TABLE_RES" "id")

#########################################
# 4. CRIAR USUÁRIO + LOGIN
#########################################
echo "👨‍🍳 Criando usuário..."

USER_RES=$(curl -s -X POST "$URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@test.com",
    "password": "123456",
    "role": "WAITER"
  }')

echo "$USER_RES"

USER_ID=$(extract "$USER_RES" "id")

echo "🔐 Fazendo login..."

TOKEN_RES=$(curl -s -X POST "$URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@test.com",
    "password": "123456"
  }')

echo "$TOKEN_RES"

TOKEN=$(extract "$TOKEN_RES" "access_token")

#########################################
# 5. CRIAR PEDIDO
#########################################
echo "🧾 Criando Pedido..."

ORDER_RES=$(curl -s -X POST "$URL/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"tableId\": \"$TABLE_ID\",
    \"userId\": \"$USER_ID\"
  }")

echo "$ORDER_RES"

ORDER_ID=$(extract "$ORDER_RES" "id")

#########################################
# FINAL
#########################################
echo ""
echo "✅ Setup concluído!"
echo "📌 Order ID: $ORDER_ID"

echo ""
echo "👉 Teste adicionar item:"
echo "curl -X POST $URL/orders/add-item \\"
echo "-H \"Content-Type: application/json\" \\"
echo "-d \"{\\\"orderId\\\": \\\"$ORDER_ID\\\", \\\"productId\\\": \\\"$PROD_ID\\\", \\\"quantity\\\": 2}\""
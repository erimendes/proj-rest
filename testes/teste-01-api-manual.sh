#!/bin/bash

URL="http://localhost:3000"

echo "🚀 Iniciando Setup Inteligente (Verificando duplicatas)..."

extract() {
  echo "$1" | sed -n "s/.*\"$2\":\"\([^\"]*\)\".*/\1/p"
}

# 1. CATEGORIA (Verifica pelo nome)
echo "📦 Verificando Categoria 'Hambúrgueres'..."
EXISTING_CAT=$(curl -s "$URL/categories" | jq -r '.[] | select(.name=="Hambúrgueres") | .id')

if [ -z "$EXISTING_CAT" ] || [ "$EXISTING_CAT" == "null" ]; then
  echo "  ➕ Criando nova categoria..."
  CAT_RES=$(curl -s -X POST "$URL/categories" -H "Content-Type: application/json" -d '{"name": "Hambúrgueres"}')
  CAT_ID=$(extract "$CAT_RES" "id")
else
  echo "  ♻️ Usando categoria existente: $EXISTING_CAT"
  CAT_ID=$EXISTING_CAT
fi

# 2. PRODUTO (Verifica pelo nome)
echo "🍔 Verificando Produto 'Hambúrguer Artesanal'..."
EXISTING_PROD=$(curl -s "$URL/products" | jq -r ".[] | select(.name==\"Hambúrguer Artesanal\") | .id")

if [ -z "$EXISTING_PROD" ] || [ "$EXISTING_PROD" == "null" ]; then
  echo "  ➕ Criando novo produto..."
  PROD_RES=$(curl -s -X POST "$URL/products" -H "Content-Type: application/json" \
    -d "{\"name\": \"Hambúrguer Artesanal\", \"price\": 35.90, \"imageUrl\": \"https://i.imgur.com/1.jpg\", \"categoryId\": \"$CAT_ID\"}")
  PROD_ID=$(extract "$PROD_RES" "id")
else
  echo "  ♻️ Produto já cadastrado: $EXISTING_PROD"
  PROD_ID=$EXISTING_PROD
fi

# 3. MESA (Verifica pelo número)
echo "🪑 Verificando Mesa 11..."
EXISTING_TABLE=$(curl -s "$URL/tables" | jq -r '.[] | select(.number==11) | .id')

if [ -z "$EXISTING_TABLE" ] || [ "$EXISTING_TABLE" == "null" ]; then
  echo "  ➕ Criando Mesa 11..."
  TABLE_RES=$(curl -s -X POST "$URL/tables" -H "Content-Type: application/json" -d '{"number": 11}')
  TABLE_ID=$(extract "$TABLE_RES" "id")
else
  echo "  ♻️ Mesa 11 já existe: $EXISTING_TABLE"
  TABLE_ID=$EXISTING_TABLE
fi

# 4. LOGIN E PEDIDO (O Pedido sempre criamos um novo para o teste)
echo "🔐 Autenticando..."
TOKEN_RES=$(curl -s -X POST "$URL/auth/login" -H "Content-Type: application/json" -d '{"email": "joao@test.com", "password": "123456"}')
TOKEN=$(extract "$TOKEN_RES" "access_token")
USER_ID=$(extract "$TOKEN_RES" "id")

echo "🧾 Abrindo novo pedido de teste..."
ORDER_RES=$(curl -s -X POST "$URL/orders" -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d "{\"tableId\": \"$TABLE_ID\", \"userId\": \"$USER_ID\"}")
ORDER_ID=$(extract "$ORDER_RES" "id")

echo -e "\n✅ Setup concluído! Order ID: $ORDER_ID"
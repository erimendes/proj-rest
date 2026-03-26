#!/bin/bash

URL="http://localhost:3000"

echo "🔥 Iniciando Fluxo Completo de Testes Automáticos..."

# 1. CRIAR CATEGORIA
echo -e "\n[1/5] Criando Categoria..."
CAT_RES=$(curl -s -X POST $URL/categories -H "Content-Type: application/json" -d '{"name": "Bebidas"}')
CAT_ID=$(echo $CAT_RES | grep -oP '(?<="id":")[^"]+')
echo "📍 ID Categoria: $CAT_ID"

# 2. CRIAR PRODUTO
echo -e "\n[2/5] Criando Produto..."
PROD_RES=$(curl -s -X POST $URL/products -H "Content-Type: application/json" \
  -d "{\"name\": \"Suco de Laranja\", \"description\": \"Natural 500ml\", \"price\": 12.00, \"categoryId\": \"$CAT_ID\"}")
PROD_ID=$(echo $PROD_RES | grep -oP '(?<="id":")[^"]+')
echo "📍 ID Produto: $PROD_ID"

# 3. CRIAR MESA
echo -e "\n[3/5] Criando Mesa 15..."
TABLE_RES=$(curl -s -X POST $URL/tables -H "Content-Type: application/json" -d '{"number": 15}')
TABLE_ID=$(echo $TABLE_RES | grep -oP '(?<="id":")[^"]+')
echo "📍 ID Mesa: $TABLE_ID"

# 4. REGISTRAR E CAPTURAR ID DO USUÁRIO
echo -e "\n[4/5] Criando Garçom Dinâmico..."
# Usando um e-mail único com timestamp para evitar erro de duplicata
EMAIL="garcom_$(date +%s)@test.com"
USER_RES=$(curl -s -X POST $URL/auth/register -H "Content-Type: application/json" \
  -d "{\"name\": \"Garcom Teste\", \"email\": \"$EMAIL\", \"password\": \"123456\", \"role\": \"WAITER\"}")
USER_ID=$(echo $USER_RES | grep -oP '(?<="id":")[^"]+')
echo "📍 ID Usuário: $USER_ID (Email: $EMAIL)"

# LOGIN PARA PEGAR O TOKEN
TOKEN_RES=$(curl -s -X POST $URL/auth/login -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"123456\"}")
TOKEN=$(echo $TOKEN_RES | grep -oP '(?<="access_token":")[^"]+')

# 5. ABRIR PEDIDO USANDO O NOVO USUÁRIO
echo -e "\n[5/5] Abrindo Pedido com ID dinâmico..."
ORDER_RES=$(curl -s -X POST $URL/orders -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"tableId\": \"$TABLE_ID\", \"userId\": \"$USER_ID\"}")
ORDER_ID=$(echo $ORDER_RES | grep -oP '(?<="id":")[^"]+')

echo -e "\n✨ TUDO PRONTO! ✨"
echo "--------------------------------------------------"
echo "ID DO PEDIDO GERADO: $ORDER_ID"
echo "ID DO PRODUTO GERADO: $PROD_ID"
echo "TOKEN DE ACESSO: Bearer $TOKEN"
echo "--------------------------------------------------"
echo "Comando para adicionar o item agora:"
echo "curl -X POST $URL/orders/add-item -H 'Content-Type: application/json' -H 'Authorization: Bearer $TOKEN' -d '{\"orderId\": \"$ORDER_ID\", \"productId\": \"$PROD_ID\", \"quantity\": 3}'"
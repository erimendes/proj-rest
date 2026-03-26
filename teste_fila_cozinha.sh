#!/bin/bash

URL="http://localhost:3000"

echo "👨‍🍳 Iniciando Teste de Fluxo da Cozinha (Versão Turbo)..."

# 1. BUSCAR MESA E PRODUTO
echo "🔍 Buscando Infraestrutura..."
MESA_ID=$(curl -s $URL/tables | jq -r 'if type=="array" then .[-1].id else .id end')
PROD_ID=$(curl -s $URL/products | jq -r 'if type=="array" then .[-1].id else .id end')

# 2. CRIAR UM USUÁRIO (GARÇOM) NA HORA PARA GARANTIR O UUID
echo "👤 Criando Garçom para o teste..."
EMAIL="teste_$(date +%s)@restaurante.com"
USER_RES=$(curl -s -X POST $URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Garcom Teste\", \"email\": \"$EMAIL\", \"password\": \"123456\", \"role\": \"WAITER\"}")

USER_ID=$(echo $USER_RES | jq -r '.id')

if [ "$USER_ID" == "null" ] || [ -z "$USER_ID" ]; then
    echo "❌ Erro ao criar usuário. Resposta: $USER_RES"
    exit 1
fi
echo "📍 User ID Gerado: $USER_ID"

# 3. ABRIR NOVO PEDIDO
echo -e "\n[1/3] Abrindo novo pedido..."
ORDER_RES=$(curl -s -X POST $URL/orders \
  -H "Content-Type: application/json" \
  -d "{\"tableId\": \"$MESA_ID\", \"userId\": \"$USER_ID\"}")

ORDER_ID=$(echo $ORDER_RES | jq -r '.id')

if [ "$ORDER_ID" == "null" ]; then
    echo "❌ Erro ao criar pedido. Resposta: $ORDER_RES"
    exit 1
fi
echo "✅ Pedido criado! ID: $ORDER_ID"

# 4. ADICIONAR ITEM
echo -e "\n[2/3] Adicionando item..."
curl -s -X POST $URL/orders/add-item \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"$ORDER_ID\", 
    \"productId\": \"$PROD_ID\", 
    \"quantity\": 2, 
    \"observation\": \"Pedido Urgente - VIP\"
  }" > /dev/null
echo "✅ Item adicionado."

# 5. CONSULTAR FILA
echo -e "\n[3/3] Monitor da Cozinha:"
echo "--------------------------------------------------"
curl -s -X GET $URL/orders/kitchen/queue | jq .
echo "--------------------------------------------------"
#!/bin/bash

URL="http://localhost:3000"

echo "👨‍🍳 Iniciando Teste de Fluxo da Cozinha (Correção UUID)..."

# 1. BUSCAR INFRAESTRUTURA
MESA_ID=$(curl -s $URL/tables | jq -r 'if type=="array" and length > 0 then .[-1].id else empty end')
PROD_ID=$(curl -s $URL/products | jq -r 'if type=="array" and length > 0 then .[-1].id else empty end')

if [ -z "$MESA_ID" ] || [ "$MESA_ID" == "null" ]; then
    echo "❌ Erro: Nenhuma mesa encontrada no banco."
    exit 1
fi

# 2. CRIAR USUÁRIO (Capturando o ID aqui que é garantido)
echo "👤 Criando Garçom..."
EMAIL="garcom_$(date +%s)@restaurante.com"
PASSWORD="123456"

USER_RES=$(curl -s -X POST $URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Garcom Teste\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"role\": \"WAITER\"}")

# CAPTURA DO ID DIRETO DO REGISTRO
USER_ID=$(echo $USER_RES | jq -r '.id')

if [ "$USER_ID" == "null" ] || [ -z "$USER_ID" ]; then
    echo "❌ Erro ao obter UUID do usuário. Resposta: $USER_RES"
    exit 1
fi
echo "✅ UUID do Usuário obtido: $USER_ID"

# 3. LOGIN PARA PEGAR O TOKEN
echo "🔐 Fazendo login..."
TOKEN_RES=$(curl -s -X POST $URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

TOKEN=$(echo $TOKEN_RES | jq -r '.access_token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "❌ Erro no Token. Verifique o login."
    exit 1
fi

# 4. ABRIR PEDIDO
echo -e "\n[1/3] Abrindo pedido..."
ORDER_RES=$(curl -s -X POST $URL/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"tableId\": \"$MESA_ID\", \"userId\": \"$USER_ID\"}")

ORDER_ID=$(echo $ORDER_RES | jq -r '.id')

if [ "$ORDER_ID" == "null" ] || [ -z "$ORDER_ID" ]; then
    echo "❌ Erro na API!"
    echo "📩 Resposta: $ORDER_RES"
    exit 1
fi
echo "✅ Pedido aberto: $ORDER_ID"

# 5. ADICIONAR ITEM E CONSULTAR FILA
echo -e "\n[2/3] Adicionando item..."
curl -s -X POST $URL/orders/add-item \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"orderId\":\"$ORDER_ID\",\"productId\":\"$PROD_ID\",\"quantity\":1}" > /dev/null

echo -e "\n[3/3] Fila da Cozinha:"
curl -s -X GET $URL/orders/kitchen/queue -H "Authorization: Bearer $TOKEN" | jq .
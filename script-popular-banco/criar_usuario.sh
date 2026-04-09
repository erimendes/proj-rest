#!/bin/bash

URL="http://localhost:3000"

echo "🚀 Iniciando Setup de Testes..."

#########################################
# 4. CRIAR USUÁRIO + LOGIN
#########################################
echo "👨‍🍳 Criando usuário..."

USER_RES=$(curl -s -X POST "$URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Silva",
    "email": "alice@test.com",
    "password": "123456",
    "role": "WAITER"
  }')

echo "$USER_RES"

# USER_ID=$(extract "$USER_RES" "id")

# echo "🔐 Fazendo login..."

# TOKEN_RES=$(curl -s -X POST "$URL/auth/login" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "email": "joao@test.com",
#     "password": "123456"
#   }')

# echo "$TOKEN_RES"

# TOKEN=$(extract "$TOKEN_RES" "access_token")

#########################################
# FINAL
#########################################
echo ""
echo "✅ Setup concluído!"

#!/bin/bash
URL="http://localhost:3000"
JSON_FILE="setup_menu_full.json"

echo "🚀 IMPORTADOR PROFISSIONAL (JSON DIRETO)"
echo "======================================="

if ! command -v jq &> /dev/null; then
  echo "❌ Instale jq: sudo apt install jq"
  exit 1
fi

# Função para requisição HTTP
request() {
  RESPONSE=$(curl -s -w "\n%{http_code}" "$@")
  BODY=$(echo "$RESPONSE" | sed '$d')
  STATUS=$(echo "$RESPONSE" | tail -n1)
  if [[ "$STATUS" -ge 400 ]]; then
    echo "❌ HTTP $STATUS"
    echo "$BODY"
    exit 1
  fi
}

declare -A CATEGORY_CACHE

# Criar categoria se não existir
get_category() {
  NAME="$1"
  if [[ -n "${CATEGORY_CACHE[$NAME]}" ]]; then
    echo "${CATEGORY_CACHE[$NAME]}"
    return
  fi
  RESPONSE=$(curl -s "$URL/categories")
  ID=$(echo "$RESPONSE" | jq -r ".[] | select(.name==\"$NAME\") | .id")
  if [[ -z "$ID" || "$ID" == "null" ]]; then
    echo "📦 Criando categoria: $NAME"
    ID=$(curl -s -X POST "$URL/categories" -H "Content-Type: application/json" -d "{\"name\":\"$NAME\"}" | jq -r '.id')
  else
    echo "♻️ Categoria já existe: $NAME"
  fi
  CATEGORY_CACHE[$NAME]=$ID
  echo "$ID"
}

# Upsert produto
upsert_product() {
  NAME="$1"
  PRICE="$2"
  DESC="$3"
  IMAGE="$4"
  CAT_ID="$5"

  EXIST_ID=$(curl -s "$URL/products" | jq -r ".[] | select(.name==\"$NAME\") | .id")
  if [[ -n "$EXIST_ID" && "$EXIST_ID" != "null" ]]; then
    echo "♻️ Atualizando produto: $NAME"
    curl -s -X PATCH "$URL/products/$EXIST_ID" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$NAME\",\"price\":$PRICE,\"description\":\"$DESC\",\"imageUrl\":\"$IMAGE\",\"categoryId\":\"$CAT_ID\"}"
  else
    echo "➕ Criando produto: $NAME"
    curl -s -X POST "$URL/products" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$NAME\",\"price\":$PRICE,\"description\":\"$DESC\",\"imageUrl\":\"$IMAGE\",\"categoryId\":\"$CAT_ID\"}"
  fi
}

# Loop no JSON completo
cat "$JSON_FILE" | jq -c '.[]' | while read categoria; do
  CAT_NAME=$(echo "$categoria" | jq -r '.categoria')
  CAT_ID=$(get_category "$CAT_NAME")
  echo "➡️ Processando produtos de $CAT_NAME"

  echo "$categoria" | jq -c '.produtos[]' | while read produto; do
    NAME=$(echo "$produto" | jq -r '.name')
    PRICE=$(echo "$produto" | jq -r '.price')
    DESC=$(echo "$produto" | jq -r '.description')
    IMAGE=$(echo "$produto" | jq -r '.image')
    upsert_product "$NAME" "$PRICE" "$DESC" "$IMAGE" "$CAT_ID"
  done
done

echo "🎉 IMPORTAÇÃO COMPLETA!"
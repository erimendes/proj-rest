#!/bin/bash

# --- CONFIGURAÇÕES ---
URL="http://localhost:3000"
JSON_FILE="setup_menu_full.json"
# ❗ INSIRA UM TOKEN VÁLIDO DE ADMIN AQUI (Gerado no seu Login)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzEwNWM3MS00OWRhLTQyYTMtOTAxZS02NWFlZjlhZTkwYjciLCJlbWFpbCI6ImFkbWluMDFAYWRtaW4uY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzc1OTYzNDAxLCJleHAiOjE3NzY1NjgyMDF9.LgRpoSNmMQ-JRK3iFrO6xE0bDi0JE1qff83qta5sz0I" 

echo "🚀 IMPORTADOR BLINDADO (NESTJS + DTO + AUTH)"
echo "======================================================"

# Verificações de dependências
if ! command -v jq &> /dev/null; then
  echo "❌ Erro: Instale o 'jq' (sudo apt install jq)"
  exit 1
fi

if [ ! -f "$JSON_FILE" ]; then
  echo "❌ Erro: Arquivo $JSON_FILE não encontrado!"
  exit 1
fi

log() { echo -e "[$(date +%H:%M:%S)] $1"; }

# --- 1. CARREGAR CACHE ---
log "📥 Sincronizando dados atuais do banco..."
ALL_CATEGORIES=$(curl -s -H "Authorization: Bearer $TOKEN" "$URL/categories")
ALL_PRODUCTS=$(curl -s -H "Authorization: Bearer $TOKEN" "$URL/products")

# Validar se o Token está funcionando
if echo "$ALL_CATEGORIES" | grep -q "Unauthorized"; then
  echo "❌ Erro: Token expirado ou inválido. Atualize a variável TOKEN no script."
  exit 1
fi

declare -A CATEGORY_CACHE

# Mapeia categorias existentes (Evita duplicatas no loop)
while read -r row; do
  NAME=$(echo "$row" | jq -r '.name')
  ID=$(echo "$row" | jq -r '.id')
  CATEGORY_CACHE["$NAME"]="$ID"
done < <(echo "$ALL_CATEGORIES" | jq -c '.[]' 2>/dev/null || echo "")

# --- 2. LOOP DE IMPORTAÇÃO ---
jq -c '.[]' "$JSON_FILE" | while read -r cat_block; do
  CAT_NAME=$(echo "$cat_block" | jq -r '.categoria')
  
  # 2.1 Tratar Categoria
  CAT_ID="${CATEGORY_CACHE[$CAT_NAME]}"
  
  if [[ -z "$CAT_ID" || "$CAT_ID" == "null" ]]; then
    log "📦 Criando categoria: $CAT_NAME"
    RES_CAT=$(curl -s -X POST "$URL/categories" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "{\"name\":\"$CAT_NAME\"}")
    CAT_ID=$(echo "$RES_CAT" | jq -r '.id')
    CATEGORY_CACHE["$CAT_NAME"]="$CAT_ID"
  fi

  log "➡️ Categoria: $CAT_NAME (ID: $CAT_ID)"

  # 2.2 Tratar Produtos
  echo "$cat_block" | jq -c '.produtos[]' | while read -r prod; do
    NAME=$(echo "$prod" | jq -r '.name')
    PRICE=$(echo "$prod" | jq -r '.price')
    DESC=$(echo "$prod" | jq -r '.description // ""') # Garante string vazia se nulo

    # MONTA O JSON EXATO QUE O CreateProductDto ESPERA
    PAYLOAD=$(jq -n \
      --arg name "$NAME" \
      --arg desc "$DESC" \
      --arg cat "$CAT_ID" \
      --arg price "$PRICE" \
      '{
        name: $name,
        description: $desc,
        price: ($price | tonumber),
        categoryId: $cat
      }')

    # Verifica se o produto já existe (Case Insensitive)
    EXIST_ID=$(echo "$ALL_PRODUCTS" | jq -r ".[] | select(.name | ascii_downcase == (\"$NAME\" | ascii_downcase)) | .id" | head -n 1)

    if [[ -n "$EXIST_ID" && "$EXIST_ID" != "null" ]]; then
      log "  ♻️ Atualizando: $NAME"
      curl -s -X PATCH "$URL/products/$EXIST_ID" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "$PAYLOAD" > /dev/null
    else
      log "  ➕ Criando: $NAME"
      # O POST retorna 201 se o DTO for válido
      HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$URL/products" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "$PAYLOAD")
      
      if [ "$HTTP_CODE" -ne 201 ]; then
        log "  ⚠️ Falha ao criar $NAME (HTTP $HTTP_CODE)"
      fi
    fi
  done
done

echo -e "\n🎉 IMPORTAÇÃO CONCLUÍDA!"
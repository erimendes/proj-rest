#!/bin/bash

# --- CONFIGURAÇÕES ---
URL="http://localhost:3000"
JSON_FILE="setup_menu_full.json"

echo "🚀 IMPORTADOR COMPATÍVEL COM NESTJS (FIELD: imageUrl)"
echo "======================================================"

# Verifica se o jq está instalado
if ! command -v jq &> /dev/null; then
  echo "❌ Erro: Instale o 'jq' (sudo apt install jq)"
  exit 1
fi

# Verifica se o arquivo JSON existe
if [ ! -f "$JSON_FILE" ]; then
  echo "❌ Erro: Arquivo $JSON_FILE não encontrado!"
  exit 1
fi

# Função para registrar logs com data
log() { echo -e "[$(date +%H:%M:%S)] $1"; }

# --- 1. CARREGAR CACHE ---
log "📥 Sincronizando dados atuais do banco..."
ALL_CATEGORIES=$(curl -s "$URL/categories")
ALL_PRODUCTS=$(curl -s "$URL/products")

declare -A CATEGORY_CACHE

# Mapeia categorias existentes para evitar duplicatas
while read -r row; do
  NAME=$(echo "$row" | jq -r '.name')
  ID=$(echo "$row" | jq -r '.id')
  CATEGORY_CACHE["$NAME"]="$ID"
done < <(echo "$ALL_CATEGORIES" | jq -c '.[]')

# --- 2. LOOP DE IMPORTAÇÃO ---
# Itera sobre o JSON consolidado
jq -c '.[]' "$JSON_FILE" | while read -r cat_block; do
  CAT_NAME=$(echo "$cat_block" | jq -r '.categoria')
  
  # 2.1 Tratar Categoria
  CAT_ID="${CATEGORY_CACHE[$CAT_NAME]}"
  
  if [[ -z "$CAT_ID" || "$CAT_ID" == "null" ]]; then
    log "📦 Criando nova categoria: $CAT_NAME"
    RES_CAT=$(curl -s -X POST "$URL/categories" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$CAT_NAME\"}")
    CAT_ID=$(echo "$RES_CAT" | jq -r '.id')
    CATEGORY_CACHE["$CAT_NAME"]="$CAT_ID"
  fi

  log "➡️ Processando: $CAT_NAME"

  # 2.2 Tratar Produtos da Categoria
  echo "$cat_block" | jq -c '.produtos[]' | while read -r prod; do
    NAME=$(echo "$prod" | jq -r '.name')
    PRICE=$(echo "$prod" | jq -r '.price')
    DESC=$(echo "$prod" | jq -r '.description')
    IMG_URL=$(echo "$prod" | jq -r '.image') # Pega 'image' do JSON

    # MONTA O JSON PARA O NESTJS (Mapeando image -> imageUrl)
    PAYLOAD=$(jq -n \
      --arg name "$NAME" \
      --arg desc "$DESC" \
      --arg img "$IMG_URL" \
      --arg cat "$CAT_ID" \
      --arg price "$PRICE" \
      '{
        name: $name,
        description: $desc,
        imageUrl: $img,
        price: ($price | tonumber),
        categoryId: $cat
      }')

    # Verifica se o produto já existe pelo nome (Case Insensitive)
    EXIST_ID=$(echo "$ALL_PRODUCTS" | jq -r ".[] | select(.name | ascii_downcase == (\"$NAME\" | ascii_downcase)) | .id" | head -n 1)

    if [[ -n "$EXIST_ID" && "$EXIST_ID" != "null" ]]; then
      log "  ♻️ Atualizando: $NAME"
      curl -s -X PATCH "$URL/products/$EXIST_ID" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD" > /dev/null
    else
      log "  ➕ Criando: $NAME"
      curl -s -X POST "$URL/products" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD" > /dev/null
    fi
  done
done

echo -e "\n🎉 PROCESSO CONCLUÍDO COM SUCESSO!"
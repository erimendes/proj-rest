#!/bin/bash

# Verifica se o jq está instalado
if ! command -v jq &> /dev/null; then
    echo "❌ Erro: O comando 'jq' não foi encontrado. Instale com: sudo apt install jq"
    exit 1
fi

URL="http://localhost:3000"
ARQUIVO="cardapio_importar.json"

echo "📂 Lendo $ARQUIVO e populando o banco..."

# Itera sobre cada categoria no JSON
jq -c '.[]' "$ARQUIVO" | while read -r linha; do
    NOME_CAT=$(echo "$linha" | jq -r '.categoria')
    
    echo -e "\n📁 Categoria: $NOME_CAT"
    
    # Cria a categoria e captura o ID
    CAT_RES=$(curl -s -X POST "$URL/categories" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"$NOME_CAT\"}")
    CAT_ID=$(echo "$CAT_RES" | jq -r '.id')
    
    # Itera sobre os produtos desta categoria
    echo "$linha" | jq -c '.produtos[]' | while read -r produto; do
        NOME_PROD=$(echo "$produto" | jq -r '.name')
        PRECO_PROD=$(echo "$produto" | jq -r '.price')
        DESC_PROD=$(echo "$produto" | jq -r '.description')
        
        # Cria o produto vinculado à categoria
        curl -s -X POST "$URL/products" \
            -H "Content-Type: application/json" \
            -d "{
                \"name\": \"$NOME_PROD\",
                \"description\": \"$DESC_PROD\",
                \"price\": $PRECO_PROD,
                \"categoryId\": \"$CAT_ID\"
            }" > /dev/null
            
        echo "  ✨ $NOME_PROD (R$ $PRECO_PROD) cadastrado."
    done
done

echo -e "\n✅ Cardápio completo importado com sucesso!"
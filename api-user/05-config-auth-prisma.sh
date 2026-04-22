#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="minha-api-user"
cd "$PROJECT_NAME"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}==> $1${NC}"; }

echo -e "${BLUE}💣 SCRIPT-04: CONFIGURANDO AUTH COM REFRESH TOKEN ROTATION${NC}"

#########################################
# PASSO 1: MIGRAÇÃO SEGURA
#########################################

log "Sincronizando Prisma..."

# Detecta migração inicial (se existir)
INIT_MIGRATION=$(ls prisma/migrations 2>/dev/null | grep _init | head -n 1 || true)

if [ -n "$INIT_MIGRATION" ]; then
  echo -e "📦 Marcando migração como aplicada: ${BLUE}$INIT_MIGRATION${NC}"
  npx prisma migrate resolve --applied "$INIT_MIGRATION" || true
fi

#########################################
# PASSO 2: GERAR MIGRAÇÃO NOVA
#########################################

log "Criando migração de sessions..."
npx prisma migrate dev --name add_sessions

#########################################
# PASSO 3: GERAR CLIENT
#########################################

log "Gerando Prisma Client..."
npx prisma generate

#########################################
# PASSO 4: VALIDAÇÃO OPCIONAL (SEM RISCO)
#########################################

log "Validando schema sem perda de dados..."
npx prisma db push --skip-generate

echo -e "\n${GREEN}✅ SCRIPT FINALIZADO COM SUCESSO!${NC}"

echo -e "\n${BLUE}✅ TUDO PRONTO!${NC}"
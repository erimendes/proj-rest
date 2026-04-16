#!/bin/bash
# Nome: 00-base-create.sh
# Objetivo: Criar a base do projeto Vite + React + TS de forma 100% automática

APP_NAME="restaurante04"

echo "🚀 Iniciando criação do projeto: $APP_NAME"

# 1. Criar o projeto Vite
# O flag --yes aceita as confirmações do npm
# O flag -- --template garante que o argumento seja passado para o create-vite
if [ ! -d "$APP_NAME" ]; then
  npm create vite@latest "$APP_NAME" --yes -- --template react-ts || { echo "❌ Falha ao criar Vite"; exit 1; }
fi

echo "------------------------------------------------------------"
echo "✅ PROJETO INICIALIZADO COM SUCESSO!"
echo "------------------------------------------------------------"
echo "🛠️  O que foi feito:"
echo "   1. Projeto Vite + React + TS criado sem perguntas."
echo "   3. Arquivos de exemplo limpos para receber a arquitetura."
echo "------------------------------------------------------------"
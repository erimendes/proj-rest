#!/bin/bash
# Objetivo: Criar a base do projeto Vite + React + TS
APP_NAME="restaurante01"

echo "🛠️ 1/2 - Criando base do projeto Vite..."

# Cria o projeto sem perguntas interativas
npm create vite@latest "$APP_NAME" -- --template react-ts || { echo "❌ Falha ao criar Vite"; exit 1; }

echo ""
echo "✅ Base criada com sucesso!"
echo "👉 Agora execute: bash 02-setup-architecture.sh"
echo "---------------------------------------------------"
echo "🚀🚀🚀🚀🚀

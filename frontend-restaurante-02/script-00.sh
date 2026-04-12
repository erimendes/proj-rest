#!/bin/bash
APP_NAME="inventario01"

# 1. Criar o projeto Vite
npm create vite@latest $APP_NAME -- --template react-ts || { echo "❌ Falha ao criar Vite"; exit 1; }
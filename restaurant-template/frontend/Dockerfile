FROM node:20
WORKDIR /app

RUN npm init -y

# Instalamos o Tailwind e explicitamente as tipagens
RUN npm install next react react-dom
RUN npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss typescript @types/node @types/react @types/react-dom

COPY . .

# Comando para ignorar erros de tipagem apenas no build se você estiver com pressa
# Mas o ideal é que o ajuste do tsconfig acima resolva
RUN npx next build

EXPOSE 3000
CMD ["npm", "start"]
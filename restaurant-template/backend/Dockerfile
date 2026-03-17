FROM node:20

WORKDIR /app

# 1️⃣ Inicializa package.json
RUN npm init -y

# 2️⃣ Copia somente package.json e prisma.config.ts + pasta prisma
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# 3️⃣ Instala dependências
RUN npm install -D prisma ts-node typescript @nestjs/cli
RUN npm install @nestjs/common @nestjs/core @nestjs/platform-express @nestjs/jwt @nestjs/passport @nestjs/websockets passport-jwt bcrypt socket.io @prisma/client @prisma/adapter-pg pg

# 4️⃣ Gera Prisma Client usando ts-node
# RUN npx ts-node --esm node_modules/.bin/prisma generate

RUN npx prisma generate

# 4. Agora sim, copia o resto do código fonte
COPY . .

EXPOSE 3000

# 5. No CMD, garantimos as migrations e iniciamos
CMD sh -c "npx prisma migrate deploy && npx nest start --watch"
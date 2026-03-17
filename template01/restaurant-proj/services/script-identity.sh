#!/bin/bash

 NOME_DO_PROJETO = " identity-service "

 echo " 🚀 Criando projeto NestJS... "
 
 nest new $PROJECT_NAME --package-manager npm --skip-git --skip-install

 cd $PROJECT_NAME

 echo " ⚙️ Inicializando Prisma... "

 npm install prisma --save-dev

 npm install @prisma/client @prisma/adapter-pg pg

 npx prisma init

###########################################
echo " 📝 Criando .dockerignore "
###########################################

cat > .dockerignore << EOF
node_modules
dist
.git
.env
EOF

###########################################
 eco " 🐳 Dockerfile "
 ###########################################

 cat > Dockerfile << EOF
 # Estágio de construção
 A PARTIR de node:latest COMO construtor
 DIRETÓRIO DE TRABALHO /aplicativo
 COPIE package*.json ./
 EXECUTE npm install

 EXECUTE npx prisma generate
 EXECUTE npx prisma migrate dev --name init_users
 CÓPIA . .
 EXECUTE npm run build

 # Estágio de execução
 A partir do nó:mais recente
 DIRETÓRIO DE TRABALHO /aplicativo
 COPIAR --de=builder /app/dist ./dist
 COPY --from=builder /app/node_modules ./node_modules
 COPY --from=builder /app/package*.json ./

 EXPOSTO 3000
 CMD ["node", "dist/main"]
EOF

 ###########################################
 eco " 🐳 docker-compose.yml "
 ###########################################

 cat > docker-compose.yml << EOF
 Serviços:
 API:
 construir: .
 portas:
 - "3000:3000"
 volumes:
 - .:/app
 - /app/node_modules # Mantém node_modules isolados do host
 - /app/dist # Impede que o volume local sobrescreva ou dist gerado
EOF

 echo " 📝 Criando esquema.prisma "
 ###########################################

 cat > prisma/esquema.prisma << EOF
 cliente gerador {
 provedor = "prisma-cliente"
 saída = "../generated/prisma"
 }

 fonte de dados db {
 provedor = "postgresql"
 }

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String   // ADMIN, WAITER, CHEF
  createdAt DateTime @default(now())
}
EOF

 ###########################################
 eco " 🌱 .env "
 ###########################################

cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5431/identity_db?schema=public"
EOF

echo " ✅ Projeto $PROJECT_NAME criado com sucesso! "

###########################################
echo " 📝 Criando PrismaService "
###########################################

cat > src/prisma/prisma.service.ts << EOF
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
EOF
Para começar um projeto de **Microserviços com DDD** de forma organizada, o segredo é não tentar codificar tudo de uma vez. Começamos pela **fundação (infraestrutura)** e pelo **contrato (identidade)**.

Siga este roteiro técnico:

---

### Passo 1: Setup do Workspace (Monorepo)

Crie a estrutura de pastas base para garantir que os serviços fiquem isolados desde o primeiro dia.

```bash
mkdir restaurant-proj && cd restaurant-proj
mkdir services gateway shared

```

### Passo 2: A Orquestra (Docker Compose)

Crie o arquivo `docker-compose.yml` na raiz. Ele será o seu "botão de ligar" para os bancos de dados e o broker de mensagens. Comece apenas com o banco do **Identity Service**.

```yaml
# ./docker-compose.yml
version: '3.8'
services:
  identity-db:
    image: postgres:15
    environment:
      POSTGRES_DB: identity_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5431:5432" # Porta diferente para não conflitar com outros DBs

```

### Passo 3: Criando o Primeiro Serviço (Identity Service)

Não crie todos os serviços agora. Foque no de Identidade para garantir que você consegue logar.

1. **Inicie o NestJS:**
```bash
cd services
nest new identity-service --package-manager npm

```


2. **Instale o Prisma:**
```bash
cd identity-service
npm install @prisma/client
npm install prisma --save-dev
npx prisma init

```


3. **Defina o Schema Inicial (`prisma/schema.prisma`):**
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String   // ADMIN, WAITER, CHEF
  createdAt DateTime @default(now())
}

```



### Passo 4: Implementando a Camada de Domínio (DDD)

Crie sua entidade de domínio **antes** dos controllers. Ela não deve depender do NestJS nem do Prisma.

```typescript
// services/identity-service/src/domain/entities/user.entity.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly role: string,
    private passwordHash: string
  ) {}

  // Lógica de negócio: validar se a senha é forte, etc.
  public static create(email: string, pass: string, role: string) {
    // validações aqui...
    return new User(crypto.randomUUID(), email, role, pass);
  }
}

```

### Passo 5: Padronização do Dockerfile

Crie o `Dockerfile` dentro de `services/identity-service/` (conforme o modelo que te mandei antes). Isso garante que o serviço rode em qualquer lugar.

---

### Resumo da Ordem de Ataque:

1. **Infra (Docker Compose):** Suba o banco de dados.
2. **Schema (Prisma):** Defina como os dados do usuário serão salvos.
3. **Domínio (Entities):** Escreva as regras de quem é o usuário.
4. **Aplicação (Use Cases):** Crie a lógica de `RegisterUser` e `Login`.
5. **Infra (Repositories):** Implemente a persistência usando Prisma.
6. **Apresentação (Controllers):** Exponha os endpoints de login/registro.

---

### Qual o seu próximo passo agora?

Você prefere que eu te ajude com a **configuração do Prisma para múltiplos bancos** no Docker Compose ou quer o código do **UseCase de Registro de Usuário** seguindo o padrão DDD?
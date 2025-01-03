## Sumario

- [Dependencias](#dependencias)
- [Rotas Disponiveis](#rotas-disponiveis)
- [Como executar](#como-executar)
  - [Com docker compose](#usando-docker-compose)
  - [Manualmente](#executando-manualmente)

## Dependencias

- Node
- Yarn
- Docker

## Rotas disponiveis

### Auth

```bash
POST /auth # Para autenticar o usuario
```

### Users

```bash
POST /users # Criar um novo usuário
GET /users # Listar todos os usuários
GET /users/:id # Listar um usuário pelo id
DELETE /users/:id # Deletar usúario
```

### Barbers

```bash
POST /barbers # Criar um novo barbeiro
GET /barbers # Listar todos os barbeiros
GET /barbers/:id # Listar um barbeiro pelo id
DELETE /barbers/:id # Deletar barbeiro
```

### Barber Shops

```bash
POST /barber-shops # Criar um novo barbearias
GET /barber-shops # Listar todos os barbearias
GET /barber-shops/:id # Listar um barbearias pelo id
DELETE /barber-shops/:id # Deletar barbearias
```

## Como executar

Antes de executar a aplicação, crie um arquivo `.env` com as credenciais da aplicação. O arquivo `.env.example` tem todas as variaveis necessárias para a execução.

Você pode executar a aplicação com `docker compose` ou `manualmente`. Em ambos os casos você deve executar o script [create-database.sql](./create-database.sql) no banco para criar `schemas` e `tables` da aplicação.

### Usando docker compose

```bash
# Sobe a aplicação e o banco junto
$ docker compose up
```

Abra o banco de dados em algum database manager e execute o script [create-database.sql](./create-database.sql) no console

### Executando manualmente

Antes de executar manualmente, certifique-se de que as credenciais de conecção com o banco foram informado no arquivo `.env`.

```bash
# Para instalar as dependencias
$ yarn

# Para executar o projeto
$ yarn dev
```

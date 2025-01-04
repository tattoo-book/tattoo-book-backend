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

### Tattoo Artists

```bash
POST /tattoo-artists # Criar um novo tatuador
GET /tattoo-artists # Listar todos os tatuadors
GET /tattoo-artists/:id # Listar um tatuador pelo id
DELETE /tattoo-artists/:id # Deletar tatuador
```

### studio

```bash
POST /studios # Criar um novo estudios
GET /studios # Listar todos os estudios
GET /studios/:id # Listar um estudios pelo id
DELETE /studios/:id # Deletar estudios
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

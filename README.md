![logo](./static/images/tattoo-book.png)

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/tattoo-book/tattoo-book-backend?style=social)
![GitHub forks](https://img.shields.io/github/forks/tattoo-book/tattoo-book-backend?style=social)
![GitHub forks](https://img.shields.io/github/commit-activity/w/tattoo-book/tattoo-book-backend?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/tattoo-book/tattoo-book-backend?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/tattoo-book/tattoo-book-backend?style=for-the-badge)

![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.5-blue?style=for-the-badge)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2.20.3-2496ED?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-28.0.1-2496ED?style=for-the-badge)
![Yarn](https://img.shields.io/badge/Yarn-1.22.22-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)

</div>

## Sobre

Tattoo book é um projeto realizado na disciplina Engenharia de Software da graduação e foi desenvolvido para facilitar a divulgação dos trabalhos de tatuadores, facilitar para os clientes encontrarem ideias e profissionais.

## Sumario

- [Dependencias](#dependencias)
- [Rotas Disponiveis](#rotas)
- [Como executar](#como-executar)
  - [Com docker compose](#usando-docker-compose)
  - [Manualmente](#executando-manualmente)

## Dependencias

- Node
- Yarn
- Docker (Caso utilize o docker compose)

## Orgnização dos diretorios

```bash
├──📂 deploy # Arquivo para deploy do projeto
|   ├──📂 dev # Para executar local
|   └──📂 prd # Para deploy em produção
├──📂 libs # Arquivos para serem exportados como pacote npm
├──📂 src # Diretório com o codigo fonte
|  ├──📂 domains # Diretorio com os módulos da aplicação
|  |   ├──📂 authentication
|  |   ├──📂 email
|  |   ├──📂 studios
|  |   ├──📂 tattoo-artist
|  |   ├──📂 tattoos
|  |   └──📂 users
|  ├──📂 shared
|  |   ├──📂 entities     # Entidades do banco
|  |   └──📂 repositories # Repositorios das entidades
|  └──📂 external # Diretorio para comunicação com servidores externos
|      ├──📂 database # Comunicação com o banco de dados
|      └──📂 rabbitmq # Integração com o RabbitMQ
└── README.md
```

## Como executar

Antes de executar a aplicação, crie um arquivo `.env` com as credenciais da aplicação. O arquivo `.env.example` tem exemplo de todas as variaveis necessárias para a execução.

Você pode executar a aplicação com `docker compose` ou `manualmente`. Em ambos os casos você deve executar o script [create-database.sql](./create-database.sql) no banco para criar `schemas` e `tabelas` da aplicação.

### Usando docker compose

```bash
# Sobe a aplicação e o banco junto
$ docker compose up
```

Abra o banco de dados em algum database manager e execute o script [create-database.sql](./create-database.sql) no console.

### Executando manualmente

Antes de executar manualmente, certifique-se de que as credenciais de conecção com o banco foram informado no arquivo `.env`.

```bash
# Para instalar as dependencias
$ yarn

# Para executar o projeto
$ yarn dev
```

## Rotas

| Method | Route               | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | /auth               | Para autenticar o usuario  |
| POST   | /users              | Criar um novo usuário      |
| GET    | /users              | Listar todos os usuários   |
| GET    | /users/:id          | Listar um usuário pelo id  |
| DELETE | /users/:id          | Deletar usúario            |
| POST   | /tattoo-artists     | Criar um novo tatuador     |
| GET    | /tattoo-artists     | Listar todos os tatuadors  |
| GET    | /tattoo-artists/:id | Listar um tatuador pelo id |
| DELETE | /tattoo-artists/:id | Deletar tatuador           |
| POST   | /studios            | Criar um novo estudios     |
| GET    | /studios            | Listar todos os estudios   |
| GET    | /studios/:id        | Listar um estudios pelo id |

## Commands to help

```bash
  # Build image using dev Dockerfile
  docker build -t tattoo-book-backend --file ./deploy/dev/Dockerfile .

  # Run container
  docker run -d --rm --env-file .env --name tattoo-book-backend  --network host tattoo-book-backend

  # Create Postgres database
  docker run -d  --env-file .env --name tattoo-book-database --hostname tattoo-book-database -p 5432:5432 postgres
```

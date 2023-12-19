# API Completa Node

## Introdução

Bem-vindo à documentação oficial da API Node.js. Esta API oferece recursos completos para gerenciar cidades, pessoas e autenticação de usuários. Siga as instruções abaixo para começar a usar a API em seus projetos.

## Índice

1. [Configuração do Ambiente](#1-configuração-do-ambiente)
2. [Instalação](#2-instalação)
3. [Executando a Aplicação](#3-executando-a-aplicação)
4. [Endpoints](#4-endpoints)
   - [Cidades](#cidades)
   - [Pessoas](#pessoas)
   - [Autenticação](#autenticação)
5. [Testes](#5-testes)
6. [Contribuição](#6-contribuição)

## 1. Configuração do Ambiente

Antes de começar, certifique-se de ter o Node.js e o npm instalados no seu ambiente. Clone este repositório e crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`.

## 2. Instalação

Execute o seguinte comando para instalar as dependências:

```bash
npm install
```

## 3. Executando a Aplicação

Inicie a aplicação com o seguinte comando:

```bash
npm start
```

A aplicação estará disponível em [http://localhost:3333](http://localhost:3333) por padrão.

## 4. Endpoints

### Cidades

- **GET /cidades**
  - Retorna todas as cidades paginadas.
- **GET /cidades/:id**
  - Retorna os detalhes de uma cidade específica.
  - **Acesso:** Privado (requer autenticação).
- **POST /cidades**
  - Cria uma nova cidade.
  - **Acesso:** Privado (requer autenticação).
- **PUT /cidades/:id**
  - Atualiza os dados de uma cidade específica.
  - **Acesso:** Privado (requer autenticação).
- **DELETE /cidades/:id**
  - Remove uma cidade com base no ID.
  - **Acesso:** Privado (requer autenticação).

...

### Pessoas

- **GET /pessoas**
  - Retorna todas as pessoas paginadas.
- **GET /pessoas/:id**
  - Retorna os detalhes de uma pessoa específica.
  - **Acesso:** Privado (requer autenticação).
- **POST /pessoas**
  - Cria uma nova pessoa.
  - **Acesso:** Privado (requer autenticação).
- **PUT /pessoas/:id**
  - Atualiza os dados de uma pessoa específica.
  - **Acesso:** Privado (requer autenticação).
- **DELETE /pessoas/:id**
  - Remove uma pessoa com base no ID.
  - **Acesso:** Privado (requer autenticação).

...

### Autenticação

- **POST /cadastrar**
  - Cadastra um novo usuário.
  - **Acesso:** Público.
- **POST /entrar**
  - Autentica um usuário existente.
  - **Acesso:** Público.

...

## 5. Testes

Execute os testes utilizando o seguinte comando:

```bash
npm test
```

Todos os testes de CRUD para cidades, pessoas, signin e signup estão definidos usando Jest para abranger todas as situações possíveis.

## 6. Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

**Observações:**
- Em desenvolvimento, a API utiliza SQLite3 como banco de dados, e em produção, é configurada para usar PostgreSQL.
- Todos os CRUDs de pessoa e cidade têm testes Jest definidos para todas as situações.
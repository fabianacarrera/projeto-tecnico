#Projeto Técnico

Sistema de gerenciamento de pets com autenticação de usuários.

## Tecnologias

- **Backend:** Laravel 11 + PHP 8.2 + PostgreSQL
- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Infraestrutura:** Docker + Docker Compose

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/fabianacarrera/projeto-tecnico.git
   cd projeto-tecnico
   ```

2. **Configure o ambiente do backend:**
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Suba os containers:**
   ```bash
   docker-compose up -d
   ```

4. **Gere a chave da aplicação Laravel:**
   ```bash
   docker exec laravel_api php artisan key:generate
   ```

5. **Execute as migrations:**
   ```bash
   docker exec laravel_api php artisan migrate
   ```

6. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - DBeaver (gerenciador de banco): http://localhost:8080

## Estrutura do projeto

```
projeto-tecnico/
├── backend/          # API Laravel
├── frontend/         # Aplicação Next.js
├── docker-compose.yml
└── README.md
```

## Funcionalidades

- Cadastro e login de usuários
- CRUD completo de pets (criar, listar, editar, excluir)
- Autenticação via token (Laravel Sanctum)

## Comandos úteis

```bash
# Ver logs dos containers
docker-compose logs -f

# Parar os containers
docker-compose down

# Reiniciar os containers
docker-compose restart

# Acessar o container do backend
docker exec -it laravel_api bash

# Rodar testes do backend
docker exec laravel_api php artisan test
```
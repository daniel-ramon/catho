**README.md**

# Projeto Candidato

Este é um projeto que consiste em duas partes: o backend e o frontend. Ambos estão contidos nesta estrutura de diretórios e podem ser configurados facilmente usando `yarn` ou `npm`.

## Configuração do Backend

### Pré-requisitos

- Node.js instalado
- [Docker](https://www.docker.com/) instalado

### Passos para configurar o Backend

1. Navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

2. Instale as dependências usando `yarn` ou `npm`:

    ```bash
    # Com yarn
    yarn install
    
    # Ou com npm
    npm install
    ```

3. Copie as variáveis de ambiente `.env.example` para `.env`:

    ```bash
    cp .env.example .env
    ```

4. Volte à pasta raiz:

    ```bash
    cd ..
    ```

4. Execute o Docker Compose para iniciar o servidor backend:

    ```bash
    docker-compose up
    ```

O servidor backend estará disponível em [http://localhost:3001](http://localhost:3001).

## Configuração do Frontend

### Pré-requisitos

- Node.js instalado
- [Docker](https://www.docker.com/) instalado

### Passos para configurar o Frontend

1. Navegue até a pasta `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências usando `yarn` ou `npm`:

    ```bash
    # Com yarn
    yarn install
    
    # Ou com npm
    npm install
    ```

3. Copie as variáveis de ambiente `.env.example` para `.env`:

    ```bash
    cp .env.example .env
    ```

4. Volte à pasta raiz:

    ```bash
    cd ..
    ```

5. Execute o Docker Compose para iniciar o servidor frontend:

    ```bash
    docker-compose up
    ```

O aplicativo frontend estará disponível em [http://localhost:3000](http://localhost:3000).

Agora você tem tanto o backend quanto o frontend do projeto Candidato configurados e prontos para uso.

## Troubleshooting
Caso o seu seeder (`create-database.sh`) não esteja com permissão para executar a criação do banco de dados execute o seguinte comando:
```bash
cd scripts
sudo chmod +x create-database.sh
```
# SAMI-APP
Repositório para teste prático na empresa Sami.

## 1. Instalacão

### 1.1. Clonar o repositório do GIT:
    git clone git@github.com:craitz/sami-app.git
### 1.2. Entrar no diretório raíz da aplicação:
    cd ./sami-app 
### 1.3. Instalar as dependências da aplicação:
    npm install
### 1.4. Iniciar o servidor MongoDB:
    mongod --dbpath ./app/db
### 1.5. Iniciar a aplicação
    npm start
## 2. Testes
#### Importar no Postman o arquivo de coleção de testes localizado em _./app/docs/_, e executar as chamadas:  
    getAllBeneficiaries (GET)
    getBeneficiary (GET)
    createBeneficiary (POST)
    updateBeneficiary (PUT)
    deleteBeneficiary (DELETE)
    


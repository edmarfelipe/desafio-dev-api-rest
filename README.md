## Description

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker compose up -d
```

## Rotas

Open API: [http://localhost:3000/api/](http://localhost:3000/api/)


| Criação de Conta | POST /accounts |
| --- | --- |
| Bloquei de Conta | PATH /accounts/{account-id} |
| Criação de Deposito | POST /accounts/{account-id}/deposit |
| Criação de Saque  | POST /accounts/{account-id}/withdraw |
| Consulta Saldo | GET /accounts/{account-id}/balance |
| Recuperar o Extrato | GET /accounts/{account-id}/transactions |

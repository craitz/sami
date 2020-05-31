// =======================================================================
// Autor: Camilo Raitz da Silva
// Descrição: ponto de entrada da aplicação
// =======================================================================

'use strict';

require('dotenv').config();
const restify = require('restify');
const joi = require('joi');
const config = require('./app/configs/configs')();
const serviceLocator = require('./app/configs/di');
const validator = require('./app/lib/validator');
const routes = require('./app/routes/routes');

// inicializa e configura o servidor
const server = restify.createServer({
    name: config.app.name,
    versions: ['1.0.0']
});

// cira conexão com a base de dados
const Database = require('./app/configs/database');
new Database(config.mongo.port, config.mongo.host, config.mongo.name);

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

// inicializa a validação para todas as chamadas
server.use(validator.paramValidation(joi));

// Seta as rotas
routes.register(server, serviceLocator);

// sobe o servidor
server.listen(config.app.port, () => {
    console.log(`Servidor [${config.app.name}] rodando na porta [${config.app.port}]`);
});

// // PENDENCIAS
// // retornar links de objetos criados
// // retornar links de objetos atualizados
// // usar docker

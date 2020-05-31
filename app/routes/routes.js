// ==================================================================
// Autor: Camilo Raitz da Silva
// Descrição: módulo que define as rotas da API e os controladores 
//            responsáveis pelo tratamento de cada requisição
// ===================================================================

'use strict';

const config = require('../configs/configs')();
const resourcePath = `${config.api.basePath}/beneficiarios`;
const controllerName = 'beneficiaryController';

module.exports.register = (server, serviceLocator) => {
    server.get({
        path: resourcePath,
        name: 'Retorna todos os beneficiários',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get(controllerName).getAll(req, res, next);
    });

    server.get({
        path: `${resourcePath}/:id`,
        name: 'Retorna um beneficiário',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get(controllerName).get(req, res, next);
    });

    server.post({
        path: resourcePath,
        name: 'Cria um beneficiário',
        version: '1.0.0',
        validation: {
            body: require('../validations/save-beneficiary')
        }
    }, (req, res, next) => {
        serviceLocator.get(controllerName).create(req, res, next);
    });

    server.put({
        path: `${resourcePath}/:id`,
        name: 'Atualiza um beneficiário',
        version: '1.0.0',
        validation: {
            body: require('../validations/save-beneficiary')
        }
    }, (req, res, next) => {
        serviceLocator.get(controllerName).update(req, res, next);
    });

    server.del({
        path: `${resourcePath}/:id`,
        name: 'Exclui um beneficiário',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get(controllerName).delete(req, res, next);
    });
}

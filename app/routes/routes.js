'use strict';

module.exports.register = (server, serviceLocator) => {
    server.get({
        path: '/beneficiarios',
        name: 'Retorna todos os beneficiários',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').getAll(req, res, next);
    });

    server.get({
        path: '/beneficiarios/:id',
        name: 'Retorna um beneficiário',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').get(req, res, next);
    });

    server.post({
        path: '/beneficiarios',
        name: 'Insere um beneficiário',
        version: '1.0.0',
        validation: {
            body: require('../validations/save-beneficiary')
        }
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').create(req, res, next);
    });

    server.put({
        path: '/beneficiarios/:id',
        name: 'Atualiza um beneficiário',
        version: '1.0.0',
        validation: {
            body: require('../validations/save-beneficiary')
        }
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').update(req, res, next);
    });

    server.del({
        path: '/beneficiarios/:id',
        name: 'Exclui um beneficiário',
        version: '1.0.0'
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').delete(req, res, next);
    });
}

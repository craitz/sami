// =================================================================================
// Autor: Camilo Raitz da Silva
// Descrição: módulo responsável pela inicialização das dependências da aplicação
// =================================================================================

'use strict';

const serviceLocator = require('../lib/service-locator');

// registra a dependência 'mongoose' no service-locator
serviceLocator.register('mongoose', () => {
    return require('mongoose');
});

// registra a dependência do serviço no service-locator
serviceLocator.register('beneficiaryService', serviceLocator => {
    const mongoose = serviceLocator.get('mongoose');
    const BeneficiaryService = require('../services/beneficiary');

    return new BeneficiaryService(mongoose);
});

// registra a dependência do controlador no service-locator
serviceLocator.register('beneficiaryController', serviceLocator => {
    const beneficiaryService = serviceLocator.get('beneficiaryService');
    const BeneficiaryController = require('../controllers/beneficiary');

    return new BeneficiaryController(beneficiaryService);
});

module.exports = serviceLocator;
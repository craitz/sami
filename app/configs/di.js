'use strict';

const serviceLocator = require('../lib/service-locator');

serviceLocator.register('mongoose', () => {
    return require('mongoose');
});

serviceLocator.register('beneficiaryService', serviceLocator => {
    const mongoose = serviceLocator.get('mongoose');
    const BeneficiaryService = require('../services/beneficiary');

    return new BeneficiaryService(mongoose);
});

serviceLocator.register('beneficiaryController', (serviceLocator) => {
    const beneficiaryService = serviceLocator.get('beneficiaryService');
    const BeneficiaryController = require('../controllers/beneficiary');

    return new BeneficiaryController(beneficiaryService);
});

module.exports = serviceLocator;
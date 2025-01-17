// =======================================================================
// Autor: Camilo Raitz da Silva
// Descrição: módulo responsável pela especificação do modelo do recurso
// =======================================================================

'use strict';

const serviceLocator = require('../lib/service-locator');
const mongoose = serviceLocator.get('mongoose');

const beneficiarySchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
        unique: false
    },
    CPF: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    RG: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: Date,
        required: true,
        unique: false
    },
    tipoPlano: {
        type: Number,
        required: true,
        unique: false
    },
    numeroDependentes: {
        type: Number,
        required: false,
        unique: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Beneficiarios', beneficiarySchema);
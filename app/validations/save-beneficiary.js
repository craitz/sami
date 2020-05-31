// ===================================================================================
// Autor: Camilo Raitz da Silva
// Descrição: módulo responsável pelo esquema que será usado na validação
// ===================================================================================

'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
    nome: joi.string().max(80).required(),
    CPF: joi.string().alphanum().min(11).max(11).required(),
    RG: joi.string().required(),
    dataNascimento: joi.date().iso().required(),
    tipoPlano: joi.number().min(1).max(3).required(),
    numeroDependentes: joi.number().max(20)
}).required();
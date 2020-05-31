// =======================================================================
// Autor: Camilo Raitz da Silva
// Descrição: classe responsável por acionar o serviços e devolver 
//            a resposta ao cliente
// =======================================================================

'use strict';

class BeneficiaryController {
    constructor(beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }

    sendServerError(res, err) {
        res.send(500, {
            message: 'Internal Server Error',
            cause: err
        });
    }

    async getAll(req, res) {
        try {
            const result = await this.beneficiaryService.getAllBeneficiaries();
            res.send(result.httpStatus, result.body);
        } catch (err) {
            this.sendServerError(res, err);
        }
    }

    async get(req, res) {
        try {
            const { id } = req.params;
            const result = await this.beneficiaryService.getBeneficiary(id);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            this.sendServerError(res, err);
        }
    }

    async create(req, res) {
        try {
            const result = await this.beneficiaryService.createBeneficiary(req.body);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            this.sendServerError(res, err);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const result = await this.beneficiaryService.updateBeneficiary(id, body);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            this.sendServerError(res, err);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.beneficiaryService.deleteBeneficiary(id);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            this.sendServerError(res, err);
        }
    }

}

module.exports = BeneficiaryController;
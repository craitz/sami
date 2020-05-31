'use strict';

class BeneficiaryController {
    constructor(beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }

    // async create(req, res) {
    //     try {
    //         const { body } = req;
    //         const result = await this.beneficiaryService.createBeneficiary(body);

    //         res.send(result);
    //     } catch (err) {
    //         console.log(err.message);
    //         res.send(err);
    //     }
    // }

    // async get(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const result = await this.beneficiaryService.getBeneficiary(id);
    //         res.send(result);
    //     } catch (err) {
    //         console.log(err.message);
    //         res.send(err);
    //     }
    // }

    async getAll(req, res) {
        try {
            const result = await this.beneficiaryService.getAllBeneficiaries();
            res.send(result.httpStatus, result.body);
        } catch (err) {
            res.send(500, {
                message: 'Internal Server Error',
                cause: err
            });
        }
    }

    async get(req, res) {
        try {
            const { id } = req.params;
            const result = await this.beneficiaryService.getBeneficiary(id);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            res.send(500, {
                message: 'Internal Server Error',
                cause: err
            });
        }
    }

    async create(req, res) {
        try {
            const result = await this.beneficiaryService.createBeneficiary(req.body);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            res.send(500, {
                message: 'Internal Server Error',
                cause: err
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const result = await this.beneficiaryService.updateBeneficiary(id, body);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            res.send(500, {
                message: 'Internal Server Error',
                cause: err
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.beneficiaryService.deleteBeneficiary(id);
            res.send(result.httpStatus, result.body);
        } catch (err) {
            res.send(500, {
                message: 'Internal Server Error',
                cause: err
            });
        }
    }

}

module.exports = BeneficiaryController;
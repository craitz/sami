'use strict';

class BeneficiaryService {
    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    async getAllBeneficiaries() {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        const found = await Beneficiaries.find();
        return {
            httpStatus: 200,
            body: found
        };
    }

    async getBeneficiary(id) {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        const found = await Beneficiaries.findOne({ _id: id });

        if (!found) {
            return {
                httpStatus: 404,
                body: {
                    message: 'Not Found',
                    cause: 'Beneficiário não encontrado'
                }
            };
        }

        return {
            httpStatus: 200,
            body: found
        };
    }

    async createBeneficiary(body) {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        let beneficiary = new Beneficiaries(body);
        beneficiary = await beneficiary.save();
        return {
            httpStatus: 201,
            body: beneficiary
        };
    }

    async deleteBeneficiary(id) {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        const found = await Beneficiaries.findOne({ _id: id });

        if (!found) {
            return {
                httpStatus: 404,
                body: {
                    message: 'Not Found',
                    cause: 'Beneficiário não encontrado'
                }
            };
        }

        await Beneficiaries.deleteOne({ _id: id });

        return {
            httpStatus: 204,
            body: {}
        };
    }

    async updateBeneficiary(id, body) {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        const filter = { _id: id };
        const update = body;

        const updated = await Beneficiaries.findOneAndUpdate(filter, update, {
            new: true,
            useFindAndModify: false
        });

        if (!updated) {
            return {
                httpStatus: 404,
                body: {
                    message: 'Not Found',
                    cause: 'Beneficiário não encontrado'
                }
            };
        }

        return {
            httpStatus: 200,
            body: updated
        };
    }
}

module.exports = BeneficiaryService;
// ===================================================================================
// Autor: Camilo Raitz da Silva
// Descrição: classe responsável por toda a lógica de négocio relacionada ao recurso
// ===================================================================================

'use strict';

const modelName = 'Beneficiarios';
const notFound = {
    httpStatus: 404,
    body: {
        code: 'NotFound',
        message: 'Beneficiário não encontrado'
    }
};

class BeneficiaryService {
    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    // monsta resposta de sucesso
    buildResponse(httpStatus, body) {
        return {
            httpStatus,
            body
        };
    }

    buildResponseInvalidDocument(message) {
        return this.buildResponse(400, {
            code: 'BadRequest',
            message: message,
            obs: 'Em alguns casos é considerado um falha de segurança avisar que um documento já existe na base de dados. Mas, por razões apenas do nosso teste prático, estou mostrando a mensagem aqui'
        });
    }

    // retorna todos os beneficiários
    async getAllBeneficiaries() {
        const Beneficiaries = this.mongoose.model(modelName);
        return this.buildResponse(200, await Beneficiaries.find());
    }

    // retorna um beneficiário
    async getBeneficiary(id) {
        const Beneficiaries = this.mongoose.model(modelName);
        const found = await Beneficiaries.findOne({ _id: id });

        if (!found) {
            return notFound;
        }

        return this.buildResponse(200, found);
    }

    // cria um beneficiário
    async createBeneficiary(body) {
        const Beneficiaries = this.mongoose.model(modelName);

        // procura por CPF já cadastrado
        const foundCPF = await Beneficiaries.findOne({ CPF: body.CPF });
        if (foundCPF) {
            return this.buildResponseInvalidDocument('CPF já cadastrado');
        }

        // procura por RG já cadastrado
        const foundRG = await Beneficiaries.findOne({ RG: body.RG });

        if (foundRG) {
            return this.buildResponseInvalidDocument('RG já cadastrado');
        }

        const beneficiary = new Beneficiaries(body);
        return this.buildResponse(201, await beneficiary.save());
    }

    // exclui um beneficiário
    async deleteBeneficiary(id) {
        const Beneficiaries = this.mongoose.model(modelName);
        const found = await Beneficiaries.findOne({ _id: id });

        if (!found) {
            return notFound;
        }

        await Beneficiaries.deleteOne({ _id: id });

        return this.buildResponse(204, {});
    }

    // atualiza um beneficiário
    async updateBeneficiary(id, body) {
        const Beneficiaries = this.mongoose.model('Beneficiarios');
        const filter = { _id: id };
        const update = body;

        const updated = await Beneficiaries.findOneAndUpdate(filter, update, {
            new: true,
            useFindAndModify: false
        });

        if (!updated) {
            return notFound;
        }

        return this.buildResponse(200, updated);
    }
}

module.exports = BeneficiaryService;
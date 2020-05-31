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
            body: require('../validations/create-beneficiary')
        }
    }, (req, res, next) => {
        serviceLocator.get('beneficiaryController').create(req, res, next);
    });

    server.put({
        path: '/beneficiarios/:id',
        name: 'Atualiza um beneficiário',
        version: '1.0.0',
        validation: {
            body: require('../validations/create-beneficiary')
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

    // server.get({
    //     path: '/beneficiarios/:id',
    //     name: 'Retorna um beneficiário',
    //     version: '1.0.0'
    // }, (req, res, next) => {
    //     const _id = validateId(req.params.id);
    //     if (_id) {
    //         db.collection('beneficiários').findOne({ _id }, (err, results) => {
    //             if (err) {
    //                 res.send(500, buildErrorResponse('Erro no servidor', err));
    //             } else {
    //                 if (results) {
    //                     res.send(results);
    //                     next();
    //                 } else {
    //                     res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
    //                 }
    //             };
    //         });
    //     } else {
    //         res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
    //     }
    // });

    // server.post({
    //     path: '/beneficiarios',
    //     name: 'Cria um beneficiário',
    //     version: '1.0.0',
    //     validation: {
    //         body: require('../validations/create-beneficiary')
    //     }
    // }, (req, res, next) => {
    //     const result = validateInput(req.body);
    //     if (result.isValid) {
    //         db.collection('beneficiários').insertOne(req.body, (err, results) => {
    //             if (err) {
    //                 res.send(500, buildErrorResponse('Erro no servidor', err));
    //             } else {
    //                 res.send(201, buildResponse('Beneficiário criado com sucesso', results.ops[0]));
    //                 next();
    //             };
    //         });
    //     } else {
    //         res.send(400, buildErrorResponse('Erro na requisição', result.cause));
    //     }
    // });

    // server.put({
    //     path: '/beneficiarios/:id',
    //     name: 'Atualiza um beneficiário',
    //     version: '1.0.0',
    //     validation: {
    //         body: require('../validations/create-beneficiary')
    //     }
    // }, (req, res, next) => {
    //     const _id = validateId(req.params.id);
    //     if (_id) {
    //         const result = validateInput(req.body);
    //         if (result.isValid) {
    //             db.collection('beneficiários').updateOne({ _id }, (err, results) => {
    //                 if (err) {
    //                     res.send(500, buildErrorResponse('Erro no servidor', err));
    //                 } else {
    //                     if (results.updatedCount > 0) {
    //                         res.send(200, buildResponse('Beneficiário atualizado com sucesso', results.ops[0]));
    //                         next();
    //                     } else {
    //                         res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
    //                     }
    //                 };
    //             });
    //         } else {
    //             res.send(400, buildErrorResponse('Erro na requisição', result.cause));
    //         }
    //     } else {
    //         res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
    //     }
    // });

    // server.del({
    //     path: '/beneficiarios/:id',
    //     name: 'Exclui um beneficiário',
    //     version: '1.0.0'
    // }, (req, res, next) => {
    //     const _id = validateId(req.params.id);
    //     if (_id) {
    //         db.collection('beneficiários').deleteOne({ _id }, (err, results) => {
    //             if (err) {
    //                 res.send(500, buildErrorResponse('Erro no servidor', err));
    //             } else {
    //                 if (results.deletedCount > 0) {
    //                     res.send(204, {});
    //                     next();
    //                 } else {
    //                     res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
    //                 }
    //             };
    //         });
    //     } else {
    //         res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
    //     }
    // });
}










// module.exports.register = (server, serviceLocator) => {

//     server.post(
//         {
//             path: '/users',
//             name: 'Create User',
//             version: '1.0.0',
//             validation: {
//                 body: require('../validations/create_user')
//             }
//         },
//         (req, res, next) =>
//             serviceLocator.get('userController').create(req, res, next)
//     );

//     server.get(
//         {
//             path: '/users/:username',
//             name: 'Get User',
//             version: '1.0.0',
//             validation: {
//                 params: require('../validations/get_birthdates-user.js')
//             }
//         },
//         (req, res, next) =>
//             serviceLocator.get('userController').get(req, res, next)
//     );

//     server.get(
//         {
//             path: '/birthdates/:username',
//             name: 'Get Birthdates',
//             version: '1.0.0',
//             validation: {
//                 params: require('../validations/get_birthdates-user.js')
//             }
//         },
//         (req, res, next) =>
//             serviceLocator.get('birthdateController').listAll(req, res, next)
//     );

//     server.post(
//         {
//             path: '/birthdates/:username',
//             name: 'Create Birthdate',
//             version: '1.0.0',
//             validation: {
//                 body: require('../validations/create_birthdates')
//             }
//         },
//         (req, res, next) =>
//             serviceLocator.get('birthdateController').create(req, res, next)
//     );
// };
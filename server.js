'use strict';

require('dotenv').config();
const restify = require('restify');
const joi = require('joi');

const config = require('./app/configs/configs')();
const serviceLocator = require('./app/configs/di');
const validator = require('./app/lib/validator');
const routes = require('./app/routes/routes');

// const mongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('mongodb');
// let db;

// inicializa e configura o servidor
const server = restify.createServer({
    name: config.app.name,
    versions: ['1.0.0']
});

// cira conexão com a base de dados
const Database = require('./app/configs/database');
new Database(config.mongo.uri);

// middlewares
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

// inicializa a validação para todas as chamadas
server.use(validator.paramValidation(joi));

// Seta as rotas
routes.register(server, serviceLocator);

// sobe o servidor
server.listen(config.app.port, () => {
    console.log(`Servidor [${config.app.name}] rodando na porta [${config.app.port}]`);
});

// const schema = joi.object({
//     id: joi.string().alphanum().min(24).max(24),
//     nome: joi.string().required(),
//     CPF: joi.string().required(),
//     // isAdmin: Joi.boolean().default(false),
//     // rank: Joi.number().integer().min(0).max(99).required(),
//     // groups: Joi.array().items(Joi.string()).required(),
//     // manager: userIdSchema,
//     // backups: Joi.when('manager', {
//     //   is: Joi.exist(),
//     //   then: Joi.array().items(userIdSchema).min(1).required(),
//     //   otherwise: Joi.forbidden()
//     // })
// })

// function validateInput(obj) {
//     const result = schema.validate(obj);
//     if (result.error) {
//         return {
//             isValid: false,
//             cause: result.error.details[0].message
//         }
//     } else {
//         return {
//             isValid: true
//         };
//     }
// }

// function getUrl(path) {
//     return `/${config.app.name}/${path}`;
// }

// function buildErrorResponse(response, cause) {
//     return {
//         response,
//         cause
//     }
// }

// function buildResponse(response, inserted) {
//     return {
//         response,
//         inserted
//     }
// }

// function validateId(id) {
//     try {
//         return ObjectId(id);
//     } catch (err) {
//         return null;
//     }

// }

// mongoClient.connect(config.mongo.uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }, (err, client) => {
//     if (err) {
//         console.log(err);
//     } else {
//         db = client.db('beneficiários');

//         server.use(restify.plugins.acceptParser(server.acceptable));
//         server.use(restify.plugins.queryParser());
//         server.use(restify.plugins.fullResponse());
//         server.use(restify.plugins.bodyParser());
//         server.use(
//             function crossOrigin(req, res, next) {
//                 res.header("Access-Control-Allow-Origin", "*");
//                 res.header("Access-Control-Allow-Headers", "X-Requested-With");
//                 return next();
//             }
//         );

//         server.get(`${getUrl('beneficiários')}`, (req, res, next) => {
//             db.collection('beneficiários').find().toArray((err, results) => {
//                 if (err) {
//                     res.send(500, buildErrorResponse('Erro no servidor', err));
//                 } else {
//                     res.send(results);
//                     next();
//                 };
//             });
//         });

//         server.get(`${getUrl('beneficiários')}/:id`, (req, res, next) => {
//             const _id = validateId(req.params.id);
//             if (_id) {
//                 db.collection('beneficiários').findOne({ _id }, (err, results) => {
//                     if (err) {
//                         res.send(500, buildErrorResponse('Erro no servidor', err));
//                     } else {
//                         if (results) {
//                             res.send(results);
//                             next();
//                         } else {
//                             res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
//                         }
//                     };
//                 });
//             } else {
//                 res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
//             }
//         });

//         server.post(`${getUrl('beneficiários')}`, (req, res, next) => {
//             const result = validateInput(req.body);
//             if (result.isValid) {
//                 db.collection('beneficiários').insertOne(req.body, (err, results) => {
//                     if (err) {
//                         res.send(500, buildErrorResponse('Erro no servidor', err));
//                     } else {
//                         res.send(201, buildResponse('Beneficiário criado com sucesso', results.ops[0]));
//                         next();
//                     };
//                 });
//             } else {
//                 res.send(400, buildErrorResponse('Erro na requisição', result.cause));
//             }
//         });

//         server.put(`${getUrl('beneficiários')}/:id`, (req, res, next) => {
//             const _id = validateId(req.params.id);
//             if (_id) {
//                 const result = validateInput(req.body);
//                 if (result.isValid) {
//                     db.collection('beneficiários').updateOne({ _id }, (err, results) => {
//                         if (err) {
//                             res.send(500, buildErrorResponse('Erro no servidor', err));
//                         } else {
//                             if (results.updatedCount > 0) {
//                                 res.send(200, buildResponse('Beneficiário atualizado com sucesso', results.ops[0]));
//                                 next();
//                             } else {
//                                 res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
//                             }
//                         };
//                     });
//                 } else {
//                     res.send(400, buildErrorResponse('Erro na requisição', result.cause));
//                 }
//             } else {
//                 res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
//             }
//         });

//         server.del(`${getUrl('beneficiários')}/:id`, (req, res, next) => {
//             const _id = validateId(req.params.id);
//             if (_id) {
//                 db.collection('beneficiários').deleteOne({ _id }, (err, results) => {
//                     if (err) {
//                         res.send(500, buildErrorResponse('Erro no servidor', err));
//                     } else {
//                         if (results.deletedCount > 0) {
//                             res.send(204, {});
//                             next();
//                         } else {
//                             res.send(404, buildErrorResponse('Not found', 'Beneficiário não encontrado'));
//                         }
//                     };
//                 });
//             } else {
//                 res.send(400, buildErrorResponse('Erro na requisição', 'Identificador invlalido'));
//             }
//         });

//         server.listen(8080, function () {
//             console.log(`${server.name} listening at ${server.url}`);
//         });
//     }
// })


// // PENDENCIAS
// // retornar links de objetos criados
// // retornar links de objetos atualizados
// // usar classes
// // usar docker
// // dotenv - o que faz ?
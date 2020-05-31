'use strict';

const serviceLocator = require('../lib/service-locator');

class Database {
    constructor(uri) {
        this.mongoose = serviceLocator.get('mongoose');;
        this._connect(uri);
    }

    _connect(uri) {
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        const { connection } = this.mongoose;

        connection.on('connected', () =>
            console.log('Conectado à base de dados com sucesso')
        );

        connection.on('error', (err) =>
            console.log('Falha ao conectar à base de dados' + err)
        );

        connection.on('disconnected', () =>
            console.log('Base de dados desconectada com sucesso')
        );

        process.on('SIGINT', () => {
            connection.close();
            console.log('Conexão à base de dados finalizada pelo NodeJS');
            process.exit(0);
        });

        // inicializa o Model
        require('../models/Beneficiaries');
    }
}

module.exports = Database;
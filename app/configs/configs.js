'use strict';

module.exports = () => ({
    app: {
        name: process.env.APP_NAME,
        port: process.env.APP_PORT || 8000,
        environment: process.env.APPLICATION_ENV,
        logpath: process.env.LOG_PATH,
    },
    mongo: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        uri: process.env.DB_URI
    }
});


// module.exports = {
//     endpoint: '/sami',
//     dbUri: 'mongodb+srv://admin:sami@cluster0-y8wzy.mongodb.net/test?retryWrites=true&w=majority',
//     resource: 'beneficiarios',
//     idLength: 24
// }
var restify = require('restify');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:sami@cluster0-y8wzy.mongodb.net/test?retryWrites=true&w=majority'
let mongoClient;

function respond(req, res, next) {
    const db = mongoClient.db('samidb');
    db.collection('beneficiarios').find().toArray((err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.send('olá');
            next();

        };
    });
}

MongoClient.connect(uri, (err, client) => {
    if (err) {
        console.log(err);
    } else {
        mongoClient = client;

        var server = restify.createServer();
        server.get('/hello/:name', respond);

        server.listen(8080, function () {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
})



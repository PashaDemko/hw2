
module.exports = function(app){

    var bodyParser = require('body-parser');
    var authentRouter = require('./accounter');


    app.use (bodyParser.urlencoded({
        extended: false
    }));

    app.get('/', function(req, res){
        res.render('index.jade');
    });
    app.use('/', authentRouter);

    app.use(function(err, req, res, next){
        var status = err.status || 500;


        res.status(status).send(err);
    });

};
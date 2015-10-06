
module.exports = function(app){
    var myVar = 'ok Now you see me';
    var bodyParser = require('body-parser');

    var userRouter = require('./user');

    var postRouter = require ('./post');



    app.use(bodyParser.json());

    app.get('/', function(req, res, next){

        res.sendFile("startpage.html", {root: __dirname + "/../public" })
    });

        app.use('/user',  userRouter);
        app.use('/post', postRouter);
        app.use(function(err, req, res, next){
        var status = err.status || 500;

        res.status(status).send(err);
    });

};
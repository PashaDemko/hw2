var jade = require('jade');
module.exports = function(app){
    var myVar = 'ok Now you see me';
    var bodyParser = require('body-parser');

    var userRouter = require('./user');

    var postRouter = require ('./post');

    data = { page: 'Home',
    content: 'VRakoshy'};

    app.use(bodyParser.json());
    app.set('view engine','jade');

       app.get('/', function(req, res, next){
        console.log(myVar);
        res.render('html/hello', data);
    });

        app.use('/user',  userRouter);
        app.use('/post', postRouter);
        app.use(function(err, req, res, next){
        var status = err.status || 500;

        res.status(status).send(err);
    });

};
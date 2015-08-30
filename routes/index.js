
module.exports = function(app){
    var myVar = 'ok Now you see me';
    var bodyParser = require('body-parser');

    var userRouter = require('./user');
    var adminRouter = require('./admin')


    function validateSession(req, res, next){
        //some logyc
        next();
    };

    app.use(bodyParser.json());
    app.get('/', function(req, res, next){
        console.log(myVar);
        res.status(200).send("hello Friend");
    });
        app.use('/user',  userRouter);
        app.use('/admin', adminRouter);


};
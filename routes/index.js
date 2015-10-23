module.exports = function(app){

    var accountRouter = require('./account');
    var authRouter = require('./authorise');
    var adminRouter = require('./admin');

    app.get('/', function(req, res, next){
        res.render('index.jade');
    });
    app.use('/account', accountRouter);
    app.use('/authorise', authRouter);
    app.use('/admin', adminRouter);

    app.use(function(err, req, res, next){
        var status = err.status || 500;
        res.status(status).send(err);
    });


};
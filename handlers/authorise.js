var mongoose = require('mongoose');
require('../models');
var crypto = require('crypto');
var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);

var login = function(email, password, callback) {

    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    Account.findOne({email:email, password:shaSum.digest('hex')},function(err,doc){
        if (err) console.log(err);

        callback(doc);
    });

};

var _Account = function () {

    this.login = function (req, res, next) {

        var password = req.body.password;
        var email = req.body.email;

        if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
            res.sendStatus(400);
            return;
        }
        login(email, password, function(account) {
            if ( !account ) {
                res.sendStatus(401);
                return;
            }
            req.session.loggedIn = true;
            req.session.accountId = account._id;
            res.status(200).send(account);
        });

    };

    this.register = function (req, res, next) {

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var email = req.body.email;
        var shaSum;
        var user;

        if ( !email  ||  !password || !firstName || !lastName ) {
            res.sendStatus(400);
            return;
        }
        shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        user = new Account({
            email: email,
            name: {
                first: firstName,
                last: lastName,
                full: firstName + ' ' + lastName
            },
            password: shaSum.digest('hex')
        });

        user.save(function (err, account) {
            if (err) {
                return next(err);
            }
            res.status(200).send(account);
        });

    };

    this.exit = function (req, res, next){

        req.session.destroy(function() {
            res.sendStatus(401);
        });

    };

};

module.exports = _Account;
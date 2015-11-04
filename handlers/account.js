
var mongoose = require('mongoose');
require('../models');
var crypto = require('crypto');


var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);


var _Account = function () {

    this.access = function (req, res, next) {

        if ( req.session && req.session.loggedIn ) {

            next();
        } else {
            res.sendStatus(401);
        }

    };
    this.editprofile = function (req, res, next) {

        var shaSum;
        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;
        var data;
        if (password) {
            shaSum = crypto.createHash('sha256');
            shaSum.update(password);
            data = {
                name: {
                    first : firstName,
                    last : lastName,
                    full : firstName + ' ' + lastName
                },
                password: shaSum.digest('hex') ,
                email: email
            }
        } else {
            data = {
                name: {
                    first : firstName,
                    last : lastName,
                    full : firstName + ' ' + lastName
                },
                email: email
            }
        }

        Account.update({_id: req.session.accountId}, {$set : data}, function(err,account){
            if (err){ return next(err);}

            res.status(200).send(account);
        });

    };

    this.profile = function (req, res, next) {

        var accountId =  req.session.accountId;

        Account.findById(accountId, function(err, account) {

        if (err) {
            return next(err);
        }
            res.status(200).send(account);
    });
};

};

module.exports = _Account;

var mongoose = require('mongoose');
require('../models');


var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);


var _Account = function () {

    this.access = function (req, res, next) {

        if ( req.session && req.session.loggedIn ) {

            next();
        } else {
            console.log('not authorize')
            res.sendStatus(401);
        }

    };

    this.me = function (req, res, next) {

        var accountId =  req.session.accountId;

        Account.findById(accountId, function(err, account) {
            if (err) {
                return next(err);
            }

            res.send(account);
        });

    };

};

module.exports = _Account;
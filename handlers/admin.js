var mongoose = require('mongoose');
require('../models');

var crypto = require('crypto');
var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);
var AdminSchema = mongoose.schemas.Admin;
var _Admin = mongoose.model('admin', AdminSchema);

var logFunc = function (login, password, callback) {

    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    _Admin.findOne({login: login, password: shaSum.digest('hex')}, function (err, doc) {
        if (err) {
            return next(err);
        }
        callback(doc);
    });

};

var Admin = function () {

    this.allUsers = function (req, res, next) {

        Account.find({}, function (err, accs) {
            if (err) return next(err);
            res.status(200).send(accs);
        });
    };

    this.login = function (req, res, next) {

        var password = req.body.password;
        var login = req.body.login;

        if (!login || !password) {
            res.sendStatus(400);
            return;
        }
        logFunc(login, password, function (admin) {
            if (!admin) {
                res.sendStatus(401);
                return;
            }
            req.session.loggedIn = true;
            req.session.adminId = admin._id;
            res.status(200).send(admin);
        });

    };

    this.deleteUser = function (req, res, next) {

        var Acc = req.params.id;

        Account.findByIdAndRemove(Acc, function (err, acc) {
            if (err) return next(err);
            if (!acc) {
                res.sendStatus(404);
                return;
            }
            if (acc.contacts.length > 0) {
                acc.contacts.forEach(function (id) {
                    Account.findById(id, function (err, contact) {

                        var delAccount;
                        var i;

                        for ( i = contact.contacts.length - 1; i >= 0; i-- ) {
                            if (Acc == contact.contacts[i]) {
                                delAccount = contact.contacts.splice(i, 1);
                            }
                        }

                        contact.save(
                            function (err) {
                                if (err) {
                                    console.log('Error deleting contact: ' + err);
                                    return next(err);
                                }
                            }
                        );
                    })
                })
            }
            Post.find({creator: Acc})
                .remove()
                .exec(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(acc);
                })
        })
    };

    this.admin = function (req, res, next) {
        if (req.session.adminId) {

            next();
        } else {
            res.sendStatus(401);
        }

    }

};

module.exports = Admin;
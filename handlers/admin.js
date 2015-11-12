var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);

var Admin = function () {

    this.allUsers = function (req, res, next) {

        Account.find({admin: false}, function (err, accs) {
            if (err) return next(err);
            res.status(200).send(accs);
        });
    };

    this.deleteUser = function (req, res, next) {

        var Acc = req.params.id;

        Account.findByIdAndRemove(Acc, function (err, acc) {
            if (err) return next(err);
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
                                Post.find({creator: Acc})
                                    .remove()
                                    .exec(function (err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        res.status(200).send(acc);
                                    })
                            }
                        );
                    })
                })
            } else {
                Post.find({creator: Acc})
                    .remove()
                    .exec(function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send(acc);
                    })
            }

        })
    };

    this.admin = function (req, res, next) {

        if (req.session.accountId == "562b58d3a9ed25982e5f4a6c") {
            next();
        } else {
            res.sendStatus(401);
        }

    }

};

module.exports = Admin;
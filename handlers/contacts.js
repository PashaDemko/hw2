var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);


var addContact = function (account, addcontact) {

    account.contacts.push(addcontact._id);

    account.save(function (err) {
        if (err) {
            console.log('Error saving account: ' + err);
            return next(err);
        }
    });

};

var removeContact = function (account, contactId) {
    var delAccount;
    var i;

    if (!account) {
        res.sendStatus(404);
        return;
    } else {
        for ( i = account.contacts.length - 1; i >= 0; i-- ) {
            if (contactId == account.contacts[i]) {
                delAccount = account.contacts.splice(i, 1);
            }
        }
    }

    account.save(
        function (err) {
            if (err) {
                console.log('Error deleting contact: ' + err);
                return next(err);
            }
        }
    );

};

var findByString = function (searchStr, callback) {

    var searchRegex = new RegExp(searchStr, 'i');

    Account.findOne({
        $or: [
            {'name.full': {$regex: searchRegex}},
            {email: {$regex: searchRegex}}
        ]
    }, callback);

};

var Contact = function () {

    this.allcontacts = function (req, res, next) {

        var accountId = req.params.id;

        Account.findById(accountId)
            .lean()
            .populate('contacts')
            .exec(function (err, user) {
                if (err){
                    return next(err);
                }
                res.status(200).send(user.contacts);
            });

    };

    this.delcontact = function (req, res, next) {

        var accountId = req.session.accountId;
        var contactId = req.params.id;

        if (!contactId) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function (err, account) {
            Account.findById(contactId, function (err, contact) {

                if (!contact) {
                    res.sendStatus(404);
                    return;
                }

                removeContact(account, contactId);
                removeContact(contact, accountId);

                res.status(200).send(account);
            });
        });

    };

    this.findContact = function (req, res, next) {

        var searchStr = req.body.searchStr;

        if (!searchStr ) {
            res.sendStatus(400);
            return;
        }

        findByString(searchStr, function (err, account) {

            if (err || !account || account._id == "562b58d3a9ed25982e5f4a6c") {
                res.sendStatus(404);
            } else {
                res.status(200).send(account);
            }
        });
    };

    this.addcontact = function (req, res, next) {

        var accountId = req.session.accountId;
        var contactId = req.body.id;

        if (!contactId || contactId == accountId) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function (err, account) {
            if (account) {
                Account.findById(contactId, function (err, contact) {
                    var i;

                    if (err) {
                        return next(err);
                    }
                    for ( i = account.contacts.length - 1; i >= 0; i-- ) {
                        if (contactId == account.contacts[i]) {
                            res.sendStatus(400);
                            return;
                        }
                    }

                    addContact(account, contact);
                    addContact(contact, account);

                    res.status(200).send(account);
                });
            }
        });

    };

};

module.exports = Contact;




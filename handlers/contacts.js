var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);


var addContact = function(account, addcontact) {

    account.contacts.push(addcontact._id);

    account.save(function (err) {
        if (err) {
            console.log('Error saving account: ' + err);
            return next(err);
        }
    });

};

var removeContact = function(account, contactId) {

    if (!account){
        res.sendStatus(404);
        return;
    } else {
        for ( var i = account.contacts.length - 1; i >= 0; i-- )
        if (contactId == account.contacts[i])
            delpost =   account.contacts.splice(i, 1);
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

var findByString = function(searchStr, callback) {

    var searchRegex = new RegExp(searchStr, 'i');

    Account.findOne({
        $or: [
            { 'name.full': { $regex: searchRegex } },
            { email: { $regex: searchRegex } }
        ]
    }, callback);

};

var Contact = function () {

    this.allcontacts = function (req, res, next) {

        var accountId = req.session.accountId;

        Account.findById(accountId)
            .lean()
            .populate('contacts')
            .exec(function(err, user){
                res.status(200).send(user.contacts);
            });

    };

    this.delcontact = function(req,res, next) {

        var accountId = req.session.accountId;
        var contactId = req.params.id;

        if ( !contactId ) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function(err, account) {
            Account.findById(contactId, function(err, contact) {

                if ( !contact ) return;

                removeContact(account, contactId);
                removeContact(contact, accountId);

                account.save( function(){
                    res.status(200).send(account);
                });

            });
        });

    };

    this.findContact = function (req, res, next) {

        var searchStr = req.body.searchStr;

        if ( !searchStr ) {
            res.sendStatus(400);
            return;
        }
        findByString(searchStr, function (err, accounts) {

            if (err || !accounts) {
                res.sendStatus(404);
            } else {
                res.status(200).send(accounts);
            }
        });
    };

    this.addcontact = function (req, res, next) {

        var accountId = req.session.accountId;
        var contactId = req.params.id;

        if (!contactId || contactId == accountId  ) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function(err, account) {
            if ( account ) {
                Account.findById(contactId, function(err, contact) {

                    addContact(account, contact);
                    addContact(contact, account);

                    res.status(200).send(account);
                });
            }
        });

    };

};

module.exports = Contact;




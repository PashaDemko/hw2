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

    var i;

    if (!account)
        res.sendStatus(404);
    else
        for (i = account.contacts.length - 1; i >= 0; i--)
            if (contactId == account.contacts[i])
                delpost =   account.contacts.splice(i, 1);
    account.save();

};

var findByString = function(searchStr, callback) {

    var searchRegex = new RegExp(searchStr, 'i');
    console.log();
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
                res.send(user.contacts)
            });

    };



    this.delcontact = function(req,res, next) {

        var accountId = req.session.accountId;

        var contactId = req.params.id;

        if ( null == contactId ) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function(err, account) {
            Account.findById(contactId, function(err, contact) {

                if ( !contact ) return;

                removeContact(account, contactId);
                removeContact(contact, accountId);

                account.save( function(){
                    res.send(contact);
                });

            });
        });

    };

    this.findContact = function (req, res, next) {

        var searchStr = req.body.searchStr;

        if ( null == searchStr ) {
            res.sendStatus(400);
        }
        findByString(searchStr, function (err,accounts) {

            if (err || !accounts) {
                res.sendStatus(404);
            } else {
                res.send( accounts);
            }
        });

    };

    this.addcontact = function (req, res, next) {

        var accountId = req.session.accountId;

        var contactId = req.params.id;
        if ( null == contactId ) {
            res.sendStatus(400);
            return;
        }
        Account.findById(accountId, function(err, account) {
            if ( account ) {
                Account.findById(contactId, function(err, contact) {

                    addContact(account, contact);
                    addContact(contact, account);

                    res.send(contact);
                });
            }
        });

    };

};
module.exports = Contact;




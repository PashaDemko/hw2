
var mongoose = require('mongoose');
require('../models');
var crypto = require('crypto');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var StatusShema = mongoose.schemas.Status;
var Status = mongoose.model('status', StatusShema);

var login = function(email, password, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    Account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
        callback(doc);
    });
};

var register = function(email, password, firstName, lastName) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    console.log('Registering ' + email);
    var user = new Account({
        email: email,
        name: {
            first: firstName,
            last: lastName,
            full: firstName + ' ' + lastName
        },
        password: shaSum.digest('hex')
    });
    user.save(registerCallback);
    console.log('Save command was sent');
};
var changePassword = function(accountId, newpassword) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(newpassword);
    var hashedPassword = shaSum.digest('hex');
    Account.update({_id:accountId}, {$set: {password:hashedPassword}},{upsert:false},
        function changePasswordCallback(err) {
            console.log('Change password done for account ' + accountId);
        });
};


var addContact = function(account, addcontact) {
   var contact = {
       name: {
           first: addcontact.name.first,
           last: addcontact.name.last,
           full: addcontact.name.first + ' ' + addcontact.name.last
       },
        accountId: addcontact._id,
        activity: addcontact.status
    };
    account.contacts.push(contact);

    account.save(function (err) {
        if (err) {

            console.log('Error saving account: ' + err);
        }

    });
};
var removeContact = function(account, contactId) {

    if ( null == account.contacts ) return;

    account.contacts.forEach(function(contact) {
        if ( contact.accountId == contactId ) {

            account.contacts.remove(contact);
        }
    });
    account.save(function(){});
};
var registerCallback = function(err) {
    if (err) {
        return console.log(err);
    };
    return console.log('Account was created');
};
var findByString = function(searchStr, callback) {
    var searchRegex = new RegExp(searchStr, 'i');
    Account.find({
        $or: [
            { 'name.full': { $regex: searchRegex } },
            { email: { $regex: searchRegex } }
        ]
    }, callback);
};

var Authent = function () {
    this.login = function (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if ( null == email || email.length < 1
            || null == password || password.length < 1 ) {
            res.Status(400);
            return;
        }
        login(email, password, function(account) {
            if ( !account ) {
                res.status(401);
                return;
            }
            req.session.loggedIn = true;

            req.session.accountId = account._id;
            res.send(req.session.accountId);

        });
    };

    this.register = function (req, res, next) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;

        if ( null == email || email.length < 1
            || null == password || password.length < 1 ) {
            res.sendStatus(400);
            return;
        }

        register(email, password, firstName, lastName);
        res.sendStatus(200);
    };

    this.authenticated = function (req, res, next) {
        if ( req.session && req.session.loggedIn ) {
            res.send({session : req.session.accountId});
        } else {
            res.sendStatus(401);
        }
    };
    this.outauth = function (req, res, next){



        req.session.destroy(function() {

               res.sendStatus(401);

            })

    };
    this.showrespass = function (req, res, next) {
        var accountId = req.body.account;
        res.render('resetPassword.jade', {locals:{accountId:accountId}});
    };

    this.editrespass = function (req, res, next) {
        var accountId = req.param('accountId', null);
        var password = req.param('password', null);
        if ( null != accountId && null != password ) {
            changePassword(accountId, password);
        }
        res.render('resetPasswordSuccess.jade');
    };
    this.activity = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        Status.find({creator : accountId }, function(err, account) {
            res.send(account);
        })
    };
    this.me = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        Account.findById(accountId, function(err, account) {
            if ( accountId == 'me' ) {
               }
            res.send(account);
        });
    };
    this.allcontacts = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        Account.findById(accountId, function (err, user) {
            if (err) {
                return next(err);
            }

            res.send(user.contacts);
        })
    };

    this.delcontact = function(req,res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        var contactId = req.body.contactId;
            if ( null == contactId ) {
            res.sendStatus(400);
            return;
        }

        Account.findById(accountId, function(err, account) {


            Account.findById(contactId, function(err, contact) {
                if ( !contact ) return;

                removeContact(account, contactId);
                removeContact(contact, accountId);
                account.save( function(){res.sendStatus(200)})
            });
        });


    };
    this.findContact = function (req, res, next) {
        var searchStr = req.body.searchStr;
        if ( null == searchStr ) {
            res.sendStatus(400);
            return;
        }
        findByString(searchStr, function (err,accounts) {
            if (err || accounts.length == 0) {
                res.sendStatus(404);
            } else {
                res.send(accounts);
            }
        });
    };
    this.addcontact = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        var contactId = req.body.contactId;


        if ( null == contactId ) {
            res.send(400);
            return;
        }

        Account.findById(accountId, function(err, account) {
            if ( account ) {
                Account.findById(contactId, function(err, contact) {
                    addContact(account, contact);
                    addContact(contact, account)

                   });
            }
        });

        res.sendStatus(200);
    };

    this.allstatus = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;


            Status.find({creator : accountId }, function(err, account) {
                res.send(account);
            })

    };

    this.newstatus = function (req, res, next) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        Account.findById(accountId, function(err, account) {
            var body = req.body;


            var status = new Status(body);
            status.creator = accountId;

            status.save((function (err, post) {
                if (err) {
                    return next(err);
                }
                console.log(account);
                account.status.push(status._id);
                account.save((function (err, post) {
                    if (err) {
                        return next(err);
                    }

                    res.sendStatus(200).send(post);
                }))

            }));

        });

    };

}
module.exports = Authent;
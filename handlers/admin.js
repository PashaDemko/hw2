var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);

var Admin = function () {

    this.allUsers = function (req, res, next) {

        Account.find({admin: false},function(err, accs){
            if (err) return next (err);
            res.send( accs);
        });
    };

    this.deleteUser = function (req, res, next) {

        var Acc = req.params.id;
        Account.findByIdAndRemove(Acc, function (err, acc){

            if (err) return next(err);

            Post.find({creator: Acc})
                .remove()
                .exec(function(err){

                    if (err) return next(err);
                    res.send(acc);
                })
        })

    };

    this.admin = function (req, res, next) {

        if (req.session.accountId == "562b58d3a9ed25982e5f4a6c" ){
            console.log("ADMIN");
            next();
        } else {
            res.sendStatus(401);
        }

    }

};

module.exports = Admin;
var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);

var Admin = function () {

    this.AllUsers = function (req, res, next) {

        Account.find()
            .lean()
            .populate('posts')
            .exec(function(err, accs){
            if (err) return next (err);
            res.status(200).send( accs);
            })

    };

    this.deleteAcc = function (req, res, next) {

        var Acc = req.params.id;
        Model.findByIdAndRemove(Acc, function (err){
            if (err) return next(err);
            Post.find({creator: Acc})
                .remove()
                .exec(function(err){
                    if (err) return next(err);
                    res.sendStatus(200);
                })
        })

    };

    this.admin = function (req, res, next) {

        if (req.session.AccoutId == "562a85433f7ad4101b8ce6f1" ){
            next();
        } else {
            res.sendStatus(401);
        }

    }

};

module.exports = Admin;
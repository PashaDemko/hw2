var mongoose = require('mongoose');
require('../models');

var UserSchema = mongoose.schemas.User;
var _User = mongoose.model('user', UserSchema);
var PostSchema = mongoose.schemas.Post;
var _Post = mongoose.model('post', PostSchema);



var Admin = function () {


    this.profile = function(req, res, next){
        _User.findById(req.params.id,(function (err, user) {
            if (err) {
                return next(err);
            }
            if (user.admin)
                next ();
            else
                res.status(404).send("Sorry bro =)");
        }) )}


        this.getAll = function (req, res, next) {
            _User
                .find()
                .populate('post')
                .lean()
                .exec(function (err, response) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send(response);
                });
        }


    this.delete = function (req, res, next) {

        _User.findByIdAndRemove (req.body._id, function (err, response)
        {
            if (err) {
                return next(err);
            }
            if (!response)
                res.status(404).send("not found")
            else
            _Post.find({creator : req.body._id})
                .remove(function (err)
                {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send("Bye, Bye")
                })

        })
    }

    this.deletePost = function (req, res, next) {

    _Post
        .find({creator: req.body._id})
        .findOne({head: req.body.head})
        .remove(function (err) {
            if (err) {
                return next(err);
            }
            _User.findById(req.body._id, function (err,user){
                if (err) {
                    return next(err)}
                if (!user)
                res.status(404).send("not found")
                else
                for ( var i = user.posts.length; i > -1; i--)
                    if (req.body.head == user.posts[i])
                        var delpost =   user.posts.splice(i, 1);

                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('You delete ' +  delpost);
                });
            })

        })
}
}

module.exports = Admin;

var mongoose = require('mongoose');
require('../models');

var UserSchema = mongoose.schemas.User;
var _User = mongoose.model('user', UserSchema);
var PostSchema = mongoose.schemas.Post;
var _Post = mongoose.model('post', PostSchema);



var Post = function () {

    this.create = function (req, res, next) {

        _User.findById(req.params.id, function (err, user) {
            if (err) {
                return next(err);
            }
            var body = req.body;

            var post = new _Post(body);


            post.creator = user._id;

            post.save(function (err, post) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(post);
            });
        })

    };
    this.showAll = function (req, res, next) {

        _Post
            .find({creator: req.params.id}, function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response)


            })
    }
    this.delete = function (req, res, next) {

        _Post
            .find({creator: req.params.id})
            .findOne({head: req.body.head})
            .remove(function (err) {
                            if (err) {
                                return next(err);
                            }
                        _User.findById(req.params.id, function (err,user){
                            if (err) {
                                return next(err)}

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
    this.edit = function (req, res, next) {

        _Post
            .find({creator: req.params.id})
            .findOne({head: req.body.head},function (err, post)
            {
                if (err) {
                    return next(err);
                }
                if (!post)
                    res.status(404).send('Not Found')
                else
                post.content = req.body.content;
                post.save(function (err, edited) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('Changes ' +  edited);
                })

            })
    }
    }





/*  this.profile = function (req, res, next) {

 _User
 .findById(req.params.id, function (err, response) {
 if (err) {
 return next(err);
 }

 res.status(200).send(response);
 });
 }
 }
this.simple = function (req, res, next){

    var user = req.params.id;
    res.status(200).send("You deleted user " + user );
}






    this.delete = function (req, res, next) {
        var number = req.params.number;
        res.status(200).send("You deleted post " + number );
    };
    this.edit = function (req, res, next) {
        var number = req.params.number;
        var text = req.params.newtext;

        res.status(200).send("you edited post" + number + "\n new text" + text);
    }*/

module.exports = Post;
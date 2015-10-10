var mongoose = require('mongoose');
require('../models');

var UserSchema = mongoose.schemas.User;
var _User = mongoose.model('user', UserSchema);
var PostSchema = mongoose.schemas.Post;
var _Post = mongoose.model('post', PostSchema);



var Post = function () {

    this.create = function (req, res, next) {

           var body = req.body;

            var post = new _Post(body);


            post.save(function (err, post) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(post);
            });
           };
    this.showAll = function (req, res, next) {
        _Post
            .find(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response)


            })
    }
    this.show = function (req, res, next) {
       _Post
            .findById(req.params.id, function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response)


            })
    }
    this.delete = function (req, res, next) {

        _Post
            .findById(req.params.id)
            .remove(function (err) {
                            if (err) {
                                return next(err);
                            }





            })
    }
    this.edit = function (req, res, next) {

        _Post
            .findById(req.params.id, function (err, post)
            {
                if (err) {
                    return next(err);
                }
                if (!post)
                    res.status(404).send('Not Found')
                else
                post.head = req.body.head;
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
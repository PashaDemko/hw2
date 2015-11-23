var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);


var _Post = function () {

    this.create = function (req, res, next) {

        var accountId = req.session.accountId;
        var body = req.body;
        var post = new Post(body);

        Account.findById(accountId, function (err, account) {
            if (!account) {
                res.sendStatus(404);
                return;
            }
            post.save((function (err, post) {
                if (err) {
                    return next(err);
                }

                account.posts.push(post._id);

                account.save((function (err, acc) {
                    if (err) {
                        return next(err);

                    }

                    res.status(200).send(post);
                }));
            }));
        });

    };


    this.posts = function (req, res, next) {

        var accountId = req.params.id;

        Account.findById(accountId)
            .lean()
            .populate('posts')
            .exec(function (err, user) {
                if (err){
                    return next(err);
                }
                res.status(200).send(user.posts);
            });

    };

    this.edit = function (req, res, next) {

        Post.findById(req.params.id, function (err, post) {
            if (err) {
                return next(err);
            }
            if (!post)
                res.send('Not Found');

            else post.content = req.body.content;

            post.save(function (err, edited) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(edited);
            });
        });

    };

    this.delete = function (req, res, next) {

        Post.findById(req.params.id, function (err, post) {
            if (!post) {
                res.sendStatus(404);
                return;
            }
            Account.findById(post.creator, function (err, user) {

                var delPost;
                var i;

                if (!user) {
                    res.sendStatus(404);
                    return;
                } else {
                    for ( i = user.posts.length - 1; i >= 0; i-- ) {
                        if (req.params.id == user.posts[i]) {
                            delPost = user.posts.splice(i, 1);
                        }
                    }
                }

                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    post.remove(function () {
                        res.status(200).send(delPost);
                    });
                });
            })
        })

    }

};

module.exports = _Post;
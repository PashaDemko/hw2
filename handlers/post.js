var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var PostShema = mongoose.schemas.Post;
var Post = mongoose.model('post', PostShema);



var _Post = function () {

    this.allposts = function (req, res, next) {

        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        console.log(accountId);

        Post.find({creator: accountId}, function (err, collection){
            if (!collection) res.sendStatus(404);

            if(err) return next(err);
            res.send(collection);
        });

    };

    this.create = function (req, res, next) {

        var accountId = req.session.accountId;
        var body = req.body;

        var post = new Post(body);

        Account.findById(accountId, function(err, account) {
            if (!account) res.sendStatus(404);

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

    this.post = function (req, res, next) {

        var postId = req.params.id;


        Post.findById(postId, function(err, post) {
            res.send(post);
        });

    };

    this.edit = function (req, res, next) {

        Post.findById(req.params.id, function (err, post){
             if (err) {
                return next(err);
             }
             if (!post)
                 res.send('Not Found');
             else
                 post.content = req.body.content;
                 post.save(function (err, edited) {
                     if (err) {
                        return next(err);
                     }
                     res.send(edited);
                 });
        });

    };

    this.delete = function (req, res, next) {

         Post.findById(req.params.id, function (err, post){
             if (!post) res.sendStatus(404);
             Account.findById(post.creator, function (err,user){
                 var delpost;

                 if (!user){
                     res.send("not found");
                 } else
                     for ( var i = user.posts.length - 1; i >= 0; i--)
                         if (req.params.id == user.posts[i])
                             delpost =   user.posts.splice(i, 1);
                 user.save(function (err, user) {
                     if (err) {
                         return next(err);
                     }
                     post.remove(function (){
                         res.send(delpost)
                     });
                 });
             })
         })

    }

};

module.exports = _Post;
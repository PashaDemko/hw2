var mongoose = require('mongoose');
require('../models');

var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var Post = mongoose.model('post', PostSchema);

var User = function () {
    this.createUser = function (req, res, next) {
        var body = req.body;

        var user = new _User(body);

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    this.profile = function (req, res, next) {

        _User
            .findById(req.params.id , function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    }
    this.friends = function (req, res, next) {
        _User
            .findById(req.params.id, function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).send('friends :' + user.friends);
            })    }
    this.addfriend = function (req, res, next) {

            _User.findById(req.params.id, function (err, user) {

                _User.findById(req.body,function (err, newFriend) {
                if (err) {
                    return next(err);
                }
                user.friends.push(newFriend.name['first']+" " + newFriend.name['last'])
                    ;
                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('You added ' +  newFriend.name['first']+" " + newFriend.name['last']);
                });

            });
        });
    }
    this.delfriend = function (req, res, next) {

        _User.findById(req.params.id, function (err, user) {

            _User.findById(req.body,function (err, Friend) {
                if (err) {
                    return next(err);
                }
                if (!Friend)
                    res.status(404).send("not found")
                else
                for (var i = user.friends.length; i > -1; i--)
                if (user.friends[i] === Friend.name['first']+" " + Friend.name['last'] )
                var delfriend =  user.friends.splice(i, 1);

                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('You delete ' +  delfriend);
                });

            });
        });
    }
    this.edit = function (req, res, next) {
        _User
            .findById( req.params.id,function (err, details)
            {
                if (err) {
                    return next(err);
                }
                if (!details)
                    res.status(404).send("not found")
                else
                details.editable = req.body.editable;
                details.save(function (err, edited) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send('New user data ' +  edited.editable);
                })
            })
    }

    this.delete = function (req, res, next) {

        _User.findByIdAndRemove (req.params.id, function (err, response)
        {
            if (err) {
                return next(err);
            }

            res.status(200).send("Bye, Bye");
        })
    }
}
        module.exports = User;
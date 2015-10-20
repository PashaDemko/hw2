var mongoose = require('mongoose');
require('../models');

var AccountSchema = mongoose.schemas.Account;
var Account = mongoose.model('account', AccountSchema);
var StatusShema = mongoose.schemas.Status;
var Status = mongoose.model('status', StatusShema);



var _Status = function () {



    this.takebyCreator = function (req, res, next) {

        var creator = req.params.id;

        Status.find({creator: creator}, function (err, collection){
            if(err) return next(err);


            res.send(collection);

        });


    };


    this.create = function (req, res, next) {

        var body = req.body;

        var post = new Status(body);


        post.save(function (err, post) {
            if (err) {
                return next(err);
            }
            Account.findById(post.creator, function(err, acc){
                acc.status.push(post._id);
                acc.save((function (err, user) {
                    if (err) {
                        return next(err);
                    }

                    res.send(post);

                }))

            })


        });
    };
    this.all = function (req, res, next) {
        var statusId = req.params.id;
        Status.find((function (err, response) {
            if (err) {
                return next(err);
            }

            res.send(response)


        }));
    };
    this.status = function (req, res, next) {
        var statusId = req.params.id;
        Status.findById(statusId, function(err, status) {
            res.send(status);
        });
    };
    this.edit = function (req, res, next) {

        Status
            .findById(req.params.id, function (err, post)
            {
                if (err) {
                    return next(err);
                }
                if (!post)
                    res.send('Not Found')
                else

                post.status = req.body.status;
                post.save(function (err, edited) {
                    if (err) {
                        return next(err);
                    }

                    res.send(edited);
                })

            })
    };
        this.delete = function (req, res, next) {

            Status
                .findById(req.params.id, function (err, status){
                    Account.findOne({_id : status.creator} , function (err,user){

                        if (!user)
                            res.send("not found")
                        else
                    for ( var i = user.status.length; i > -1; i--)
                        if (req.params.id == user.status[i])
                            var delpost =   user.status.splice(i, 1);



                    user.save(function (err, user) {
                        if (err) {
                            return next(err);
                        }
                        status.remove(function (){res.send(delpost)});

                    });
                })
                })


        }
   }
module.exports = _Status;
/**
 * Created by Ïàøà on 24.09.2015.
 */
var mongoose = require('mongoose');
require('./models');

var UserSchema = mongoose.schemas.User;
var _User = mongoose.model('user', UserSchema);


module.exports = function  () {
    var db = mongoose.connection.db;
    db.dropDatabase(function(err){if (err)  throw  err ;
   Test1 = new _User({
        _id: 1,
            admin : true,
        editable : { name :{first: "User",
                    last : "New"},
            age: 18,
            username: "Newuser",
            password: 123}});
    Test1.save()
    })} ();


/**
 * Created by Паша on 24.09.2015.
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
        editable : { name :{first: "Vasya",
                    last : "Dark"},
            age: 18,
            username: "Darkvas",
            password: 123}});
    Test1.save()
    })} ();


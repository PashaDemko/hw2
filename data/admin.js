var mongoose = require('mongoose');
require('../models');
var crypto = require('crypto');

var AdminSchema = mongoose.schemas.Admin;
var Admin = mongoose.model('admin', AdminSchema);

mongoose.connection.on('open', function () {

    Admin.findOne({login: 'Admin'}, function (err, acc) {
        if (!acc) {

            var shaSum = crypto.createHash('sha256');

            shaSum.update("admin123");
            Test1 = new Admin({
                    login: "Admin",
                    password: shaSum.digest('hex')
                }
            );
            Test1.save(function (err, acc) {
                if (err) return "something wrong"
            })

        }
    })
});

function done(err) {
    if (err) console.error(err.stack);
    mongoose.connection.close();
}

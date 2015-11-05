var mongoose = require('mongoose');
require('../models');
var crypto = require('crypto');

var AccountSchema = mongoose.schemas.Account;
var Admin = mongoose.model('account', AccountSchema);

mongoose.connection.on('open', function() {

    Admin.findOne({email: 'Administrator' }, function (err, acc){
        if (!acc) {

           var shaSum = crypto.createHash('sha256');

            shaSum.update("admin123");
            Test1 = new Admin({
                    _id : "562b58d3a9ed25982e5f4a6c",
                    email:   "Administrator",
                    password: shaSum.digest('hex'),
                    name: {
                        first:  "Main",
                        last:    "Admin",
                        full:  "Main Admin"
                    },
                    admin : true
                }
            );
            Test1.save(function(err, acc){
                if (err) return "something wrong"
            })

        }
    })
});

function done(err) {
    if (err) console.error(err.stack);
    mongoose.connection.close();
}

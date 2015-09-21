var express = require('express');
var jade = require('jade');
var app = express();
require('./config');
var port = process.env.PORT;
var mongoose = require('mongoose');


mongoose.connect('localhost/VRakoshy');
var db = mongoose.connection;
db.on("error", function (err){
    console.error(err)
})
db.once('open', function (){
    console.log('connected');
});
require('./routes')(app);
require('./handlers/user');

app.listen(port, function(){
    console.log('Server start success = ' + port);
});

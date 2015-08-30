var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

require('./routes')(app);

var myModule = require('./handlers/user');

app.listen(port, function(){
    console.log('Server start success = ' + port);
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('./config');
var port = process.env.PORT;
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var db;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session(
    {
        secret: "Vrakoshysecretkey",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }
));

app.use(express.static(__dirname + '/public'));

mongoose.connect('localhost/Vrakoshydb');
db = mongoose.connection;
db.on("error", function (err) {
    console.error(err)
});
db.once('open', function () {
    console.log('connected to db');
});

require('./data/admin');
require('./routes')(app);

app.listen(port, function () {
    console.log('Server start success = ' + port);
});
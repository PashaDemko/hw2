var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new mongoose.Schema({
    login: {type: String, unique: true},
    password: {type: String}
});

var Admin = mongoose.model('admin', AdminSchema);

mongoose.schemas = {};
mongoose.schemas.Admin = AdminSchema;

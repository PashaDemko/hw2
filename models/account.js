var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String},
    name: {
        first: {type: String},
        last: {type: String},
        full: {type: String}
    },
    admin: {type: Boolean, default: false},
    contacts: [{type: Schema.ObjectId, ref: 'account'}],
    posts: [{type: Schema.ObjectId, ref: 'post'}]
});

var Account = mongoose.model('account', AccountSchema);

mongoose.schemas = {};
mongoose.schemas.Account = AccountSchema;


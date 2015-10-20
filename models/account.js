var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./status');

var Contact = new Schema({
    name: {
        first:   { type: String },
        last:    { type: String },
        full:    { type: String }
    },
    accountId: { type: mongoose.Schema.ObjectId }
});




var AccountSchema = new mongoose.Schema({
    email:     { type: String, unique: true },
    password:  { type: String },
    name: {
        first:   { type: String },
        last:    { type: String },
        full:    { type: String }
    },
    birthday: {
        day:     { type: Number, min: 1, max: 31, required: false },
        month:   { type: Number, min: 1, max: 12, required: false },
        year:    { type: Number }
    },
    photoUrl:  { type: String },
    biography: { type: String },
    contacts:  [Contact],
    status: [{type: String, ref: 'status'}]

});





var Account = mongoose.model('account', AccountSchema);


mongoose.schemas = {};
mongoose.schemas.Account = AccountSchema;


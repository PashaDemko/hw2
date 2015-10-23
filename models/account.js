var mongoose = require('mongoose');
var Schema = mongoose.Schema;



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
    contacts:   [{type: Schema.ObjectId, ref: 'account'}],      //!!!
    posts: [{type: Schema.ObjectId, ref: 'post'}]     //!!!
});


var Account = mongoose.model('account', AccountSchema);


mongoose.schemas = {};
mongoose.schemas.Account = AccountSchema;


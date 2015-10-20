var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StatusShema = new Schema({
    creator: {type: String, ref: 'account'},
    status:    { type: String }
});

var Status = mongoose.model('status', StatusShema);


mongoose.schemas = {};
mongoose.schemas.Status = StatusShema;

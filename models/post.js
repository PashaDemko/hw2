var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostShema = new Schema({
    creator: {
        type: Schema.ObjectId,
        ref: 'account'
    },
    content:    { type: String }
});

var Status = mongoose.model('post', PostShema);


mongoose.schemas = {};
mongoose.schemas.Post = PostShema;

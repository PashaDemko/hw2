var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostShema = new Schema({
    creator: {
        type: Schema.ObjectId,
        ref: 'account'
    },
    content: {type: String}
});

var Post = mongoose.model('post', PostShema);

mongoose.schemas = {};
mongoose.schemas.Post = PostShema;

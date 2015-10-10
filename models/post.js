var mongoose = require('mongoose');
require('./user');


var Schema = mongoose.Schema;

var PostSchema = Schema({

    head: {type: String},
    creator: {type: Number, ref: 'user'},

    content: String,
    created_at: Date,
    updated_at: Date
});

PostSchema.pre('save', function(next) {
        var currentDate = new Date();

        this.updated_at = currentDate;
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    }
)
var Post = mongoose.model('post', PostSchema);
mongoose.schemas = {};
mongoose.schemas.Post = PostSchema;

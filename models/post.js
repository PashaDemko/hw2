var mongoose = require('mongoose');
require('./user');


var Schema = mongoose.Schema;

var PostSchema = Schema({
    _id: Number,
    head: {type: String, unique: true},
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
        var currentPost = this;
        User.findOne({_id : this.creator}, function (err, Friend) {
                if (err) {
                    return next(err);
                }
                Friend.posts.push(currentPost.head);

                Friend.save(function (err, Friend) {
                    if (err) {
                        return next(err);
                    }next()})
            }
        )
    }
)
var Post = mongoose.model('post', PostSchema);
mongoose.schemas = {};
mongoose.schemas.Post = PostSchema;

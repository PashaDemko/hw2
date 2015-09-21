var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = Schema({
    _id: {type : Number, unique: true  },

   editable : {
       name: {
    first: {type: String, default: 'Name'},
    last: {type: String, default: 'Surname'}},
    age: Number,

    username: { type: String, required: true, unique: true },
       email: { type: String,  default: 'Enter your mail adress'},
       password: { type: String, required: true}
    },

    posts: [{type: String, ref: 'post'}],
    friends: [{type: String, ref: Array}],
    admin: [{type : Boolean, default: false}],
    location: String,
    meta: {
                website: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

UserSchema.pre('save', function(next) {
       var currentDate = new Date();

    this.updated_at = currentDate;
       if (!this.created_at)
        this.created_at = currentDate;
    next();
});



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
var User = mongoose.model('user', UserSchema);
mongoose.schem = {};
mongoose.schem.User = UserSchema;
mongoose.schemas = {};
mongoose.schemas.Post = PostSchema;




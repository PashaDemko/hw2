var mongoose = require('mongoose');
require('./post');





var Schema = mongoose.Schema;

var UserSchema = Schema({
    _id: {type : Number, unique: true  },

    name_first :{ type: String },
    name_last :{ type: String },

    username: { type: String, required: true, unique: true },
    email: { type: String,  default: 'Enter your mail adress'},
    password: { type: String, required: true},

    photoUrl: { type: String },
    biography: { type: String },
    age :  {type : Number},

    posts: [{type: String, ref: 'post'}],
    friends: [{  type: String, ref: 'Array'

    }],
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


var User = mongoose.model('user', UserSchema);
mongoose.schemas = {};
mongoose.schemas.User = UserSchema;





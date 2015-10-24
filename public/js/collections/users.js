define(['models/user'], function(user) {
    var UserCollection = Backbone.Collection.extend({
        model: user,
        url:  '/admin'

    });

    return UserCollection;
});

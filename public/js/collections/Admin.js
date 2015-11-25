define(['models/Admin'], function (user) {
    var AdminCollection = Backbone.Collection.extend({

        model: user,
        url: '/admin'

    });

    return AdminCollection;
});

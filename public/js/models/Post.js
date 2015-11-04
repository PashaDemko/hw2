define(function() {
    var Post = Backbone.Model.extend({

        idAttribute: '_id',
        urlRoot: '/account/posts',


    });

    return Post;
});
define(['models/Post'], function (Post) {
    var PostCollection = Backbone.Collection.extend({

        model: Post,
        url: '/account/posts'

    });

    return PostCollection;
});

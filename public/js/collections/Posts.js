define(['models/Post'], function (Post) {
    var PostCollection = Backbone.Collection.extend({

        model: Post,

        initialize: function(models, options) {
            this.id = options.id;
        },
        url: function() {
            return '/account/posts/' + this.id;
        }

    });

    return PostCollection;
});

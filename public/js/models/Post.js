define(function () {
    var Post = Backbone.Model.extend({

        idAttribute: '_id',
        urlRoot: '/account/posts',
        validate: function (attrs) {
            if (!attrs.content) {
                alert("Please write something!");
                return "Nothing input"
            }
        }

    });

    return Post;
});
/**
 * Created by Паша on 08.10.2015.
 */
define(['views/post'], function (postView) {
    viewUsers = Backbone.View.extend({
        tagName : "ul",

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(post) {
            var post1 = new postView({ model: post});
            this.$el.append( post1.render().el );
        }


    });



    return viewUsers;
});

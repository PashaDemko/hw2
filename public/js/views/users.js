define(['views/user'], function (userView) {
    viewUsers = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(user) {
            var user = new userView({ model: user});
            this.$el.append( user.rendering().el );
        }


    });



    return viewUsers;
});

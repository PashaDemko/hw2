define(['text!templates/friendpost.html'], function( postTemplate) {
    var postView = Backbone.View.extend({

        initialize: function(){
            this.render();
        },

        template: _.template(postTemplate),

        render: function() {
            this.$el.html(this.template({model :this.model.toJSON()}));
            return this;
        }
    });

    return postView;
});

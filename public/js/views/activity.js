define(['SocialNetView', 'text!templates/activity.html', 'models/statusOriginal'], function(SocialNetView, statusTemplate, Post) {
    var statusView = SocialNetView.extend({


        initialize: function(){
            this.render();
        },

        template: _.template(statusTemplate),
        initialize: function(){
            this.render();
        },

        render: function() {

            this.$el.html(this.template({model :this.model}));
            return this;
        }
    });

    return statusView;
});

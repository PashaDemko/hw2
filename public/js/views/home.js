define(['text!templates/home.html'], function (homeTemplate) {
    var homeView = Backbone.View.extend({

        el: '#contents',

        template: _.template(homeTemplate),

        render: function () {
            this.$el.html(this.template());
        }
    });

    return homeView;
});
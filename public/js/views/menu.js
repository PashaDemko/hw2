define([
    'text!templates/menu.html',
    'models/authorise'
], function (menuTemplate, Entry) {

    var menuView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (options) {

            if (options.authenticated) {
                this.authenticated = options.authenticated;
            }

        },


        template: _.template(menuTemplate),

        render: function () {

            var that = this;
            this.$el.html(this.template({authenticated: this.authenticated}));

        }

    });

    return menuView;
});

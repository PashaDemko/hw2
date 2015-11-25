define([
    'text!templates/admin/admin.html',
    'collections/Admin',
    'views/admin/user',
    'models/authorise'
], function (indexTemplate, Users, UserView, Entry) {

    var adminView = Backbone.View.extend({

        el: $('#content'),

        template: _.template(indexTemplate),

        initialize: function () {
            this.renderUsers();
        },

        renderUsers: function () {

            var usersCollection = new Users();

            usersCollection.fetch({
                success: function () {
                    _.each(usersCollection.toJSON(), function (user) {
                        var viewUser = new UserView({model: user}).render().el;
                        $('.users_list').append(viewUser);
                    })
                }
            })

        },

        render: function () {
            this.$el.html(this.template());
        }

    });

    return adminView;
});

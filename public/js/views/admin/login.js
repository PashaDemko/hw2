define([
    'models/Admin',
    'text!templates/admin/login.html'
], function (Admin, loginTemplate) {

    var loginView = Backbone.View.extend({

        el: $('#content'),

        events: {
            "submit .login_form": "login"
        },

        login: function () {
            var that = this;

            var data = {
                _id: "me",
                login: this.$el.find('#login').val(),
                password: this.$el.find('#password').val()
            };

            var entry = new Admin(data);

            entry.save({},
                {
                    success: function () {
                        that.undelegateEvents();
                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#mainAdmin', {trigger: true});
                    },
                    error: function () {
                        $("#error").text('Unable to login');
                    }
                });

            return false;
        },

        render: function () {
            this.$el.html(loginTemplate);
        }
    });

    return loginView;
});

define([
    'text!templates/register.html',
    'collections/authorise'
], function (registerTemplate, Entry) {

    var registerView = Backbone.View.extend({

        el: '#contents',

        events: {
            "submit .register_form": "register"
        },

        register: function (e) {
            var that = this;
            var entry = new Entry();
            var data = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val()
            };

            e.preventDefault();

            entry.create(data,
                {
                    success: function () {
                        that.undelegateEvents();
                        Backbone.history.fragment = '';
                        Backbone.history.navigate('#login', {trigger: true});
                    },
                    error: function () {
                        if (!data.email || !data.firstName || !data.lastName || !data.password) {
                            alert("fill all fields pls");
                            return "Nothing input"
                        }
                        alert('this email is already used')
                    }
                }
            )

        },

        render: function () {
            this.$el.html(registerTemplate);
        }

    });

    return registerView;
});

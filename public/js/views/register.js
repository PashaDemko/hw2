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

            e.preventDefault();
            var entry = new Entry();
            var data = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val()
            };

            entry.create(data,
                {
                    success: function () {
                        window.location.hash = 'login';
                    },
                    error: function () {
                        if (!data.email && !data.firstName && !data.lastName && !data.password) {
                            alert("fill all fields pls");
                        }
                        else alert('this email is already used')
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

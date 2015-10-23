define(['text!templates/register.html', 'collections/authorise'], function(registerTemplate, Entry) {
    var registerView = Backbone.View.extend({

        el: $('#content'),
        events: {
            "submit .register_form": "register",
            'click .cancelBtn': 'cancel'
        },

        register: function(e) {

            e.preventDefault();
            var entry = new Entry();
            entry.create({
                    firstName: $('#firstName').val(),
                    lastName: $('#lastName').val(),
                    email: $('#email').val(),
                    password: $('#password').val()
                }
                , {success: function (){  window.location.hash = 'login'},
                    error: function(){alert("fill all fields")}},{wait: true}
            )

        },

        cancel: function(){
            window.location.hash = 'login';
        },

        render: function() {
            this.$el.html(registerTemplate);
        }

    });

    return registerView;
});

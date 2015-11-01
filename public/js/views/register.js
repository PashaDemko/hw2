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
            var data = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val()
            };

            entry.create(data,
                {success: function (){  window.location.hash = 'login'},
                    error: function(){
                        if (!data.email && !data.firstName && !data.lastName && !data.password )
                        alert("fill all fields pls");
                    else alert('this email is already used')}}
            )

        },

        cancel: function(){
            this.undelegateEvents();
            window.location.hash = 'login';
        },

        render: function() {
            this.$el.html(registerTemplate);
        }

    });

    return registerView;
});

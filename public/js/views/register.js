define(['text!templates/register.html', 'models/coauth'], function(registerTemplate, Entry) {
    var registerView = Backbone.View.extend({
        el: $('#content'),
        events: {
            "submit form": "register",
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
                , {wait: true})
            window.location.hash = 'login';
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
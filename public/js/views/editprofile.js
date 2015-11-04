define(['text!templates/editprofile.html'], function(editprofile){

    var editProfile = Backbone.View.extend({

        template: _.template(editprofile),

        initialize: function () {
            this.render();
        },

        events: {
            'submit .edit-profile-form'  : 'submit',
            'click button.cancel' : 'cancel'
        },

        submit: function(e) {

            var model = this.model.toJSON();
            var that = this;

            var data = {
                firstname : $('#edit_firstName').val(),
                lastname: $('#edit_lastName').val(),
                password: $('#edit_password').val(),
                email: $('#edit_mail').val()
            };

            e.preventDefault();

            this.model.save(data, {
                success: function (){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
                    },
                error: function (){
                    console.log('error')
                    }});

        },

        cancel: function() {
            this.remove();
        },

        render: function () {
            console.log(this.model);
            this.$el.html(this.template({ model  : this.model.toJSON() }));
            return this;
        }

    });

    return editProfile;

});

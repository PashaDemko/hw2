define(['text!templates/account/editProfile.html'], function (editProfile) {

    var editProfile = Backbone.View.extend({

        el: '#contents',

        template: _.template(editProfile),

        events: {
            'click #saveBtn': 'saveItem'
        },

        saveItem: function () {
            var that = this;
            var thisEl = this.$el;
            var data = {
                firstname: thisEl.find('#edit_firstName').val(),
                lastname: thisEl.find('#edit_lastName').val(),
                password: thisEl.find('#edit_password').val(),
                email: thisEl.find('#edit_mail').val()
            };

            this.model.save(data, {

                success: function () {
                    that.undelegateEvents();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
                },
                error: function () {
                    if ( !data.lastname || !data.firstname || !data.email) {
                        alert("fill fields: FirstName, LastName, Email");
                        return "Nothing input";
                    }
                        alert('this email is already used')
                }

            });
        },

        render: function () {
            var model = this.model.toJSON();

            this.$el.html(this.template({model: model}));

            return this;
        }

    });

    return editProfile;
});

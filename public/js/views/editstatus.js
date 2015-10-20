define(['text!templates/editstatus.html'], function(editpost){

    EditPost = Backbone.View.extend({
        template: _.template(editpost),

        initialize: function () {
            this.render();
            this.form = this.$('form');
            this.status = this.form.find('#edit_status');

        },
        events: {
            'submit #edit-post-form'  : 'submit',
            'click button.cancel' : 'cancel'
        },

        submit: function(e) {
            e.preventDefault();

            this.model.save({
                status: this.status.val()

            });
            this.remove();

            vent.trigger('statuschanged', this.model);


        },
        cancel: function() {
            this.remove();

        },

        render: function () {

            var self = this;
            var model = this.model.toJSON()
            self.$el.html(this.template({ model  : model }));
            return self;

        }
    });
    return EditPost;
})
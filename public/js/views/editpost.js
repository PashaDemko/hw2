/**
 * Created by Паша on 09.10.2015.
 */
define(['text!templates/editpost.html', 'router'], function(editpost){

    EditPost = Backbone.View.extend({
        template: _.template(editpost),

        initialize: function () {
            this.render();
            this.form = this.$('form');
            this.head = this.form.find('#edit_head');
            this.content = this.form.find('#edit_content');
        },
        events: {
            'submit #edit-post-form'  : 'submit',
            'click button.cancel' : 'cancel'
        },

        submit: function(e) {
            e.preventDefault();

            this.model.save({
                head: this.head.val(),
                content: this.content.val()
            });
            this.remove();

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
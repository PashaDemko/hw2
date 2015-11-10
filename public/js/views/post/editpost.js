define(['text!templates/posts/editpost.html', 'text!templates/posts/postCreate.html'], function (editpost, postCreate) {

    var EditPost = Backbone.View.extend({

        template: _.template(editpost),

        initialize: function () {
            this.render();
        },

        events: {
            'click button.save': 'submit',
            'click button.cancel': 'cancel'
        },

        submit: function (e) {
            e.preventDefault();
            this.model.save({content: $('#edit_content').val()}, {
                success : function (){
                    $(".postCreate").html (postCreate);
                }
            });
        },

        cancel: function (e) {
            e.preventDefault();
            $(".postCreate").html (postCreate);
        },

        render: function () {
            this.$el.html(this.template({model: this.model.toJSON()}));

            return this;
        }

    });

    return EditPost;
});
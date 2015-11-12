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
            var content = $('#edit_content').val();

            e.preventDefault();

            this.model.save({content: content}, {
                success : function (){
                    $(".postCreate").html(postCreate);
                    $(".showAdd").hide();
                }
            });
        },

        cancel: function () {
            $(".postCreate").html (postCreate);
            $(".showAdd").hide();
        },

        render: function () {
            this.$el.html(this.template({model: this.model.toJSON()}));

            return this;
        }

    });

    return EditPost;
});
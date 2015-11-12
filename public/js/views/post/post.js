define([
    'text!templates/posts/post.html',
    'models/Post',
    'views/post/editpost'
], function (postTemplate, Post, editPost) {

    var postView = Backbone.View.extend({

        show: false,
        editButton: false,
        removeButton: false,


        template: _.template(postTemplate),

        events: {
            'click .removeBtn': 'remove',
            'click .editBtn': 'editPost',
            'click .list-group-item': 'showButtons',
            'click .hides': 'hideButtons'
        },

        hideButtons: function (e) {
            var targetEl = $(e.target);
            var table = targetEl.closest('.list-group-item');
            var buttons = $(this.el).find(".buttons");

            e.preventDefault();
            e.stopPropagation();

            table.removeClass("active");
            buttons.fadeOut();

        },

        showButtons: function (e) {
            var targetEl = $(e.target);
            var table = targetEl.closest('.list-group-item');
            var buttons = $(this.el).find(".buttons");

            e.preventDefault();

            $(".list-group-item").removeClass("active");
            $(".buttons").hide();
            table.addClass("active");
            buttons.fadeIn();
        },

        initialize: function (options) {

            this.model.on('change', this.render, this);
            this.options = options;
            if (this.options.editButton) {
                this.editButton = this.options.editButton;
            }
            if (this.options.removeButton) {
                this.removeButton = this.options.removeButton;
            }

        },

        remove: function (e) {
            var that = this;
            var targetEl = $(e.target);
            var table = targetEl.closest('.list-group-item');
            var id = table.attr('id');
            var post = new Post({_id: id});

            post.destroy({
                success: function () {
                    var a = + $(".postnumber").text()- 1;

                    table.remove();
                    $(".postnumber").text(a);
                },
                error: function () {
                    alert('error');
                }
            });

            return false;
        },

        editPost: function () {
            var model = this.model.toJSON();
            var editPostView = new editPost({model: this.model});

            $('.postCreate').html(editPostView.el);
        },

        render: function () {

            var model = this.model.toJSON();
            var buttons;

            this.$el.html(this.template({
                show: this.show,
                model: model,
                editButton: this.editButton,
                removeButton: this.removeButton
            }));
            buttons = $(this.el).find(".buttons");
            buttons.hide();

            return this;
        }

    });

    return postView;
});

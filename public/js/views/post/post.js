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
            'click table': 'showButtons',
            'click .hides': 'hideButtons'
        },

        hideButtons: function () {

            Backbone.history.fragment = '';
            Backbone.history.navigate('#index', {trigger: true});

        },

        showButtons: function (e) {
            e.preventDefault();
            var targetEl = $(e.target);
            var table = targetEl.closest('table');
            var buttons = $(this.el).find(".buttons");

            $("table").removeClass("active");
            $(".buttons").hide();

            table.addClass("active");
            buttons.show();
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

            var targetEl = $(e.target);
            var tr = targetEl.closest('table');
            var id = tr.attr('id');
            var post = new Post({_id: id});

            post.destroy({
                success: function () {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
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

define([
    'text!templates/contacts/contact.html',
    'views/post/post',
    'models/post',
    'collections/Posts',
    'models/Contact'
], function (contactTemplate, viewPost, Post, Posts, Contact) {

    var contactView = Backbone.View.extend({


        addButton: false,
        admin: false,
        posts: false,
        template: _.template(contactTemplate),

        events: {
            "click .addbutton": "addContact",
            "click .removebutton": "removeContact",
            'click .showcont': "showButtons"
        },

        showButtons: function (e) {
            var targetEl = $(e.target);
            var contact = targetEl.closest('.list-group-item');

            contact.toggleClass("well");
             $(this.el).find(".postarea").fadeToggle();
        },

        addContact: function () {

            var responseArea = this.$('.actionarea');
            var contact = new Contact({_id: "me"});

            contact.save({id: this.model.get('_id')},{
                success: function () {
                    responseArea.text('Contact added');
                }, error: function () {
                    responseArea.text('Could not add contact');
                }
            });
        },

        removeContact: function (e) {

            var responseArea = this.$('.actionarea');
            var that = this;

            var targetEl = $(e.target);
            var delcontact = targetEl.closest('.list-group-item');
            var contact = new Contact({_id: this.model.get('_id')});

            contact.destroy({
                success: function () {
                    var a = + $(".contactnumber").text()-1;
                    delcontact.remove();
                    $(".contactnumber").text(a);
                },
                error: function () {
                    responseArea.text('Could not remove contact');
                }
            });

        },

        initialize: function (options) {
            var that = this;
            this.model.on('change', this.render, this);
            this.options = options;

            if (this.options.addButton) {
                this.addButton = this.options.addButton;
            }
            if (this.options.admin) {
                this.admin = this.options.admin;
            }
            if (this.options.posts) {
                console.log('ahhha');
                that.renderPosts();
                this.posts = this.options.posts;
            }
        },

        renderPosts: function () {
            var that = this;
            var postCollection = new Posts([], {id : this.model.get('_id')});

            postCollection.fetch({
                success: function(){
                    _.each(postCollection.toJSON(), function (post) {
                        var postModel = new Post (post);
                        var postHtml = new viewPost({model: postModel}).render().el;
                        $(postHtml).appendTo('.post' + that.model.get('_id'));
                    });
                }
            });
        },

        render: function () {
            $(this.el).html(this.template({
                model: this.model.toJSON(),
                addButton: this.addButton,
                admin: this.admin,
                posts: this.posts
            }));
            $(this.el).find(".postarea").hide();

            return this;
        }
    });

    return contactView;
});

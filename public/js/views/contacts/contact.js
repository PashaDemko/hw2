define([
        'text!templates/contacts/contact.html',
        'views/post/post',
        'models/Post',
        'models/Contact'
    ], function(contactTemplate, viewPost, Post, Contact) {

        var contactView = Backbone.View.extend({

            addButton: false,
            removeButton: false,
            template: _.template(contactTemplate),

            events: {
                "click .addbutton": "addContact",
                "click .removebutton": "removeContact",
                'click .list-group-item': 'showbuttons'
            },

            showbuttons: function (e){

                $(".list-group-item").removeClass("active");

                var db = $(this.el).find(".postarea");
                db.toggle();

            },

            addContact: function() {

                var $responseArea = this.$('.actionarea');
                var contact = new Contact({_id: this.model.get('_id')});

                contact.fetch({success:function () {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
                }, error: function () {
                    $responseArea.text('Could not add contact');
                }});
            },

            removeContact: function(e) {

                var $responseArea = this.$('.actionarea');
                var contact = new Contact({_id: this.model.get('_id')});

                contact.destroy({success:function () {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
                },
                    error: function () {
                    $responseArea.text('Could not remove contact');
                }});

            },

            initialize: function(options) {
                this.model.on('change', this.render, this);
                this.options = options;
                this.renderPosts();
                if ( this.options.addButton ) {
                    this.addButton = this.options.addButton;
                }
                if ( this.options.removeButton ) {
                    this.removeButton = this.options.removeButton;
                }
            },

            renderPosts: function (){
                var that = this;
                var postsCollection = this.model.get('posts');
                _.each(postsCollection, function (idpost) {
                    var  post = new Post({_id: idpost});
                    post.fetch({success:function(){
                        var postHtml = new viewPost({ model: post }).render().el;
                        $(postHtml).appendTo('.post'+ that.model.get('_id'));
                    }})
                });
            },

            render: function() {
                var postarea;

                $(this.el).html(this.template({
                    model: this.model.toJSON(),
                    addButton: this.addButton,
                    removeButton: this.removeButton
                }));
                postarea = $(this.el).find(".postarea");
                postarea.hide();

                return this;
            }
        });

        return contactView;
    });

define(['text!templates/contact.html', 'views/post', 'models/Post', 'models/Contact'],
    function(contactTemplate, viewPost, Post, Contact) {
        var contactView = Backbone.View.extend({

            addButton: false,
            removeButton: false,
            template: _.template(contactTemplate),
            events: {
                "click .addbutton": "addContact",
                "click .removebutton": "removeContact"
            },

            addContact: function() {
                var $responseArea = this.$('.actionArea');
                var contact = new Contact({_id: this.model.get('_id')});

                contact.fetch({success:function () {
                    $responseArea.text('Contact Added');
                    window.location.hash = 'index';
                }, error: function () {
                    $responseArea.text('Could not add contact');
                }});
            },

            removeContact: function(e) {

                var $responseArea = this.$('.actionarea');
                $responseArea.text('Removing contact...');
                var contact = new Contact({_id: this.model.get('_id')});
                contact.destroy({success:function () {
                    $responseArea.text('Contact Removed');

                }, error: function () {
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
                $(this.el).html(this.template({
                    model: this.model.toJSON(),
                    addButton: this.addButton,
                    removeButton: this.removeButton
                }));
                return this;

            }
        });

        return contactView;
    });

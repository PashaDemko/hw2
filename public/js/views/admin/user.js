define([
    'text!templates/admin/user.html',
    'models/user',
    'views/post/post',
    'collections/Posts',
    'models/post',
    'collections/Contacts',
    'views/contacts/contact'
], function(userTemplate, User, viewPost, Posts, Post, ContactCollection, ContactView) {

    var userView = Backbone.View.extend({

        template: _.template(userTemplate),

        events: {
            'click .removeBtn': 'remove'
        },

        initialize: function(){
            this.renderPosts();
            this.contactCollection();
        },

        remove: function(e){

            var targetEl = $(e.target);
            var table = targetEl.closest('table');
            var id = table.attr('id');
            var user = new User({_id: id});

            user.destroy({
                success: function(){table.remove();},
                error: function(){alert('error');}
            });

            return false;
        },

        contactCollection: function (){
            var that = this;
            var contactsCollection = new ContactCollection([], {id : this.model._id});

            contactsCollection.fetch({

                    success: function (){

                        contactsCollection.each(function(contact){
                            var contactHtml = new ContactView({admin: true,  model: contact}).render().el;
                            $('.contact'+ that.model._id).append(contactHtml);

                        });
                    }
                }
            )

        },

        renderPosts: function (){
            var that = this;
            var postCollection = new Posts([], {id : this.model._id});

            postCollection.fetch({
                success: function(){
                    _.each(postCollection.toJSON(), function (post) {
                        var postModel = new Post (post);
                        var postHtml = new viewPost({removeButton: true, model: postModel}).render().el;
                        $(postHtml).appendTo('.post' + that.model._id);
                    });
                }
            });
        },

        render: function() {
            var model = this.model;

            this.$el.html(this.template({ model: model }));

            return this;
        }

    });

    return userView;
});

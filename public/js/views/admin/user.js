define([
    'text!templates/admin/user.html',
    'models/user',
    'views/post/post',
    'models/Post'
], function(userTemplate, User, viewPost, Post) {

    var userView = Backbone.View.extend({

        template: _.template(userTemplate),

        events: {
            'click .removeBtn': 'remove'
        },

        initialize: function(){

            this.renderPosts();
            this.render();

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

        renderPosts: function (){
            var that = this;
            var postsCollection = this.model.posts;

            _.each(postsCollection, function (idpost) {
                var  post = new Post({_id: idpost});

                post.fetch({
                    success:function(){
                        var postHtml = new viewPost({removeButton: true, model: post }).render().el;
                        $(postHtml).appendTo('.post'+ that.model._id);
                    }
                })
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

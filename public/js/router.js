define(['models/posts', 'views/mainview', 'views/posts'],function(Posts,viewMain, viewPosts){


    AppRouter = Backbone.Router.extend({
        routes: {
            '' : 'index'


        },

        index: function() {
            usersd = new Posts();
            usersd.fetch();



            usersview = new viewMain ({collection : usersd});

            postview = new viewPosts({collection : usersd})
            $(document.body).append(postview.render().el);

        }

    });

    return new AppRouter();

});
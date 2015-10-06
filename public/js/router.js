define([],function(){


    AppRouter = Backbone.Router.extend({
        routes: {
            '/users' : 'index'
        },

        index: function() {
            console.log('Index!!!');
        }

    });

    return new AppRouter();

});
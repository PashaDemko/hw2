define(['router'], function(AppRouter) {

    var initialize = function() {

        var router = new AppRouter();
        var fragment = Backbone.history.fragment;
        var url = window.location.hash;

        Backbone.history.start();

        if (fragment){
            Backbone.history.fragment = '';
        } else {
            Backbone.history.navigate(url, {trigger: true});
        }

    };

    return {
        initialize: initialize
    };
});
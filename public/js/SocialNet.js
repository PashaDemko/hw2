
define(['router', 'models/coauth'], function(router, Entry) {

    var initialize = function() {
        window.vent = _.extend({}, Backbone.Events);
        checkLogin(runApplication);

    };
    var checkLogin = function(callback) {
        var entry = new Entry();
        entry.fetch({success: function() {
            return callback(true);
        },
        error: function(data) {
            return callback(false);
        }});
      };
    var runApplication = function(authenticated) {
        if (!authenticated) {
            window.location.hash = 'login';
        } else {
            window.location.hash = 'index';
        }
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
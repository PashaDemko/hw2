
define(['models/authentation'],function(entry) {
    var Entry = Backbone.Collection.extend({
        model: entry,
        url: '/authorise'
    });

    return Entry;
});

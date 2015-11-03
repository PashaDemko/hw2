define(['models/authorise'],function(entry) {
    var Entries = Backbone.Collection.extend({

        model: entry,
        url: '/authorise'

    });

    return Entries;
});

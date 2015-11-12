define(function () {
    var Entry = Backbone.Model.extend({

        idAttribute: '_id',
        urlRoot: '/authorise'

    });

    return Entry;
});

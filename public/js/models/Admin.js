define(function () {
    var Account = Backbone.Model.extend({

        idAttribute: '_id',
        urlRoot: '/admin'

    });

    return Account;
});

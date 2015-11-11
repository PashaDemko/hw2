define(function () {
    var Contact = Backbone.Model.extend({

        idAttribute: '_id',
        urlRoot: '/account/contacts'
    });

    return Contact;
});

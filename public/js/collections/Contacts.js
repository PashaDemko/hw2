define(['models/Contact'], function (Contact) {
    var ContactCollection = Backbone.Collection.extend({

        model: Contact,

        initialize: function(models, options) {
            this.id = options.id;
        },
        url: function() {
            return '/account/contacts/' + this.id;
        }

    });

    return ContactCollection;
});
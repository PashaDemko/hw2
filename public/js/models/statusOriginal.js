
define(function() {
    var Status = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/status',
        validate: function(attrs) {
            if( !attrs.status ) {
                alert ("Write Smthg!");
                return "Nothing input"
            }
        }
    });

    return Status;
});
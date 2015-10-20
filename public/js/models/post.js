/**
 * Created by Паша on 04.10.2015.
 */
define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function(){
            return '/post';
        },
        validate: function(attrs) {
            if( !attrs.head ) {
                return "Имя и фамилия обязательны для заполнения!";
            }
           }
    });

    return Model;
    //return 'Hello';
});
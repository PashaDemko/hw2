/**
 * Created by Паша on 04.10.2015.
 */
define([], function(){
    var Model = Backbone.Model.extend({
        idAttributes: '_id',

        urlRoot: function(){
            return '/post';
        }
    });

    return Model;
    //return 'Hello';
});
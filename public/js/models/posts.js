/**
 * Created by Паша on 07.10.2015.
 */
define(['models/post'], function(Model){
    var Users = Backbone.Collection.extend({
        model: Model,
        url: '/post'
    });
    return Users;
});
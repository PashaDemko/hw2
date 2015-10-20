/**
 * Created by Паша on 04.10.2015.
 */
define(['models/user'], function(Model){
    var Users = Backbone.Collection.extend({
        model: Model,
        url: '/user'
        });
    return Users;
    });

      //return 'Hello';

/**
 * Created by ���� on 04.10.2015.
 */
define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function(){
            return '/post';
        },
        validate: function(attrs) {
            if( !attrs.head ) {
                return "��� � ������� ����������� ��� ����������!";
            }
           }
    });

    return Model;
    //return 'Hello';
});
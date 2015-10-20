/**
 * Created by Паша on 08.10.2015.
 */
define([], function(){
var newContact = Backbone.View.extend({
    el: '#addPost',

    events: {
        'submit' : 'addContact'
    },

    addContact: function(e) {
        e.preventDefault();

        this.collection.create({
            head: this.$('#head').val(),
            content: this.$('#content').val()
            }, { wait: true })
    }
})
return newContact
});
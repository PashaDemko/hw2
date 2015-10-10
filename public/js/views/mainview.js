/**
 * Created by Паша on 08.10.2015.
 */
define(['views/addpost',  'views/editpost'], function ( newContact, editPost) {
    viewMain = Backbone.View.extend({


        initialize: function() {



            var addContactView = new newContact({ collection: this.collection });
            vent.on('contact:edit', this.editContact, this);

        },
        editContact: function(model) {
            var editContactView = new editPost({ model: model });
            $('.post-form-block').html(editContactView.el);
        }

    });
    return viewMain;
})
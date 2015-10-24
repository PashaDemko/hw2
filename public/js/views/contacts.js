define(['views/contact', 'text!templates/contacts.html'],
function( ContactView, contactsTemplate) {
  var contactsView = Backbone.View.extend({

    initialize: function() {

      this.render();
      this.collection.on('change', this.render, this);
    },
    events:{
      'click .cancelBtn': 'cancel'
    },

    cancel: function(){
      window.location.hash = 'index';
    },

    render: function() {
      this.$el.html(contactsTemplate);
      this.collection.each(function(contact){
        var contactHtml = new ContactView({removeButton: true,  model: contact}).render().el;
        $('.contacts_list').append(contactHtml);
      });
      return this;
    }

  });

  return contactsView;
});

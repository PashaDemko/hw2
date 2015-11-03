define(['views/contacts/contact'],
function( ContactView) {
  var contactsView = Backbone.View.extend({

    initialize: function() {
      this.collection.on('change', this.render, this);
    },

    events:{
      'click .cancelBtn': 'cancel'
    },

    cancel: function(){
      Backbone.history.fragment = '';
      Backbone.history.navigate('#index', {trigger: true});
    },

    render: function() {
      this.collection.each(function(contact){
        var contactHtml = new ContactView({removeButton: true,  model: contact}).render().el;
        $('.contacts_list').append(contactHtml);
      });

      return this;
    }

  });

  return contactsView;
});

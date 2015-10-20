define(['SocialNetView', 'views/contact', 'text!templates/contacts.html'],
function(SocialNetView, ContactView, contactsTemplate) {
  var contactsView = SocialNetView.extend({
  //el: $('.friends'),

    initialize: function() {
      this.render()



       this.collection.on('change', this.render, this);
    },
    render: function() {


      this.$el.html(contactsTemplate);
      this.collection.each(function(contact) {
      //  console.log(contact.toJSON())

        var contactHtml = new ContactView({removeButton: true,  model: contact}).render().el
        $('.contacts_list').append(contactHtml);

      });
      return this;
    }
  });

  return contactsView;
});

define(['models/Contact'], function(Contact) {
  var ContactCollection = Backbone.Collection.extend({
    model: Contact,
   url:  '/accounts/me/contact'

  });

  return ContactCollection;
});
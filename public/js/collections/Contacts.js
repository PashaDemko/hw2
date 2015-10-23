define(['models/Contact'], function(Contact) {
  var ContactCollection = Backbone.Collection.extend({
    model: Contact,
   url:  '/account/contacts'

  });

  return ContactCollection;
});
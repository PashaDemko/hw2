define(['SocialNetView', 'text!templates/index.html',
    'text!templates/status.html', 'models/statusOriginal',

    'views/status', 'views/editstatus', 'models/authentation', 'models/ContactCollection', 'views/contacts'],
    function(SocialNetView,  indexTemplate,
             statusTemplate, Status,  StatusView, editstatus, Entry, ContactCollection, ContactsView) {
      var indexView = SocialNetView.extend({
        el: $('#content'),

        template: _.template(indexTemplate),

        events: {
          "submit form": "postStatus",
          'click .QuitBtn': 'quit'
        },

        initialize: function (options) {

          vent.on('status:edit', this.editStatus, this);
          this.renderCollection()




        },

        renderCollection: function (){

          var contactsCollection = new ContactCollection();

          contactsCollection.fetch({success: function (){
            console.log(contactsCollection.toJSON())

            var viewContact =  new ContactsView({removeButton: true, collection: contactsCollection}).render().el
            $('.friends').append(viewContact);}})
        },

        quit: function(){

          var entry = new Entry({_id: "me"});

          entry.destroy();
          window.location.hash = 'login';
        },

        postStatus: function() {
          var that = this;
          var data = { creator : this.model.get('_id'),
            status : $('#status').val()
          };
          var newStatus = new Status(data);

          newStatus.save({},{success: function(){
            console.log("new Status")
            that.undelegateEvents();
            Backbone.history.fragment = '';
            Backbone.history.navigate('#index', {trigger: true});}});

          return false;
        },

        editStatus: function(model) {
          var editContactView = new editstatus({ model: model });
          $('.status-form-block').html(editContactView.el);
        },


        render: function() {

          var that = this;
          var model = this.model.toJSON()
          this.$el.html (this.template( {model: this.model.toJSON()}));


          var modelstatus = new Status();
          var statusCollection = this.model.get('status');

          _.each(statusCollection, function (idstatus) {
            var statusModel = new Status({_id : idstatus});
            statusModel.fetch({success: function(){
              var statusHtml = (new StatusView({ model: statusModel })).render().el;
              $('.statuses_list').append(statusHtml);




            }},{wait: true});

          })
          return this;
        }

      });
  return indexView
})
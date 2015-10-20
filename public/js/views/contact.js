define(['SocialNetView', 'text!templates/contact.html', 'views/activity', 'models/stforCont', 'models/Contact'],
    function(SocialNetView, contactTemplate, Activity, Status, Contact) {
  var contactView = SocialNetView.extend({
 //   el: "#contact",


    addButton: false,
    removeButton: false,
    template: _.template(contactTemplate),

    events: {
      "click .addbutton": "addContact",
      "click .removebutton": "removeContact"
    },

    addContact: function() {

      var $responseArea = this.$('.actionArea');
      $.post('/accounts/me/contact',
        {contactId: this.model.get('_id')},
        function onSuccess() {

          $responseArea.text('Contact Added');


        }, function onError() {
          $responseArea.text('Could not add contact');
        }
      );
        window.location.hash = 'index';
    },

    removeContact: function(e) {

       // var div = targetEl.closest('div');
      //  var id = div.attr('id');
      var contact = new Contact({id: this.model.get('accountId')});
      var $responseArea = this.$('.actionarea');
      $responseArea.text('Removing contact...');
      console.log (this.model.get('accountId'));
           $.ajax({
        url: '/accounts/me/contact',
        type: 'DELETE',
        data: {
          contactId: this.model.get('accountId')
        }}).done(function onSuccess() {

          $responseArea.text('Contact Removed');

        }).fail(function onError() {
          $responseArea.text('Could not remove contact');
        });
    },

    initialize: function(options) {
        this.model.on('change', this.render, this)



      this.options = options;
       _.bindAll(this, 'render');
       if ( this.options.addButton ) {
       this.addButton = this.options.addButton;
       }

       if ( this.options.removeButton ) {
       this.removeButton = this.options.removeButton;
       }
      // Set the addButton variable in case it has been added in the constructor



    },

    render: function() {

      $(this.el).html(this.template({
        model: this.model.toJSON(),
        addButton: this.addButton,
        removeButton: this.removeButton
      }));

      var creator = this.model.get('accountId');

     var  statusCollection = new Status({id: creator});
      statusCollection.fetch({success:function(){

        _.each(statusCollection.toJSON(),function (idstatuses) {



              var statusHtml = new Activity({ model: idstatuses }).render().el;
              $(statusHtml).appendTo('.'+ idstatuses.creator);

            }
        )
      }})
      return this;

    }
  });

  return contactView;
});

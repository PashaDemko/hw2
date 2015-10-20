
define(['views/index', 'views/register', 'views/login',
        'models/Account',
        'models/StatusCollection','views/contacts', 'models/ContactCollection',
        'views/addcontact'],
    function(IndexView, RegisterView, LoginView,
             Account, StatusCollection,  ContactsView, ContactCollection, AddContactView) {
        var SocialRouter = Backbone.Router.extend({
            currentView: null,
            routes: {
                'addcontact': 'addcontact',
                "index": "index",
                "login": "login",
                "register": "register",
                'contacts': 'contacts'
            },

            changeView: function(view) {
                if ( null != this.currentView ) {
                    this.currentView.undelegateEvents();
                }
                this.currentView = view;
                this.currentView.render();
            },
            addcontact: function() {
                this.changeView(new AddContactView());
            },
            index: function() {

                var that = this;
                var model = new Account({id:'me'});
                model.fetch({success: function(){

                    that.changeView(new IndexView({ model: model}))

                }})
                ;       },
            login: function() {
                this.changeView(new LoginView());
            },

            register: function() {
                this.changeView(new RegisterView());
            },

            contacts: function() {

                var contactsCollection = new ContactCollection();

                contactsCollection.fetch({success: function(){
                   new ContactsView({collection: contactsCollection}
                   )}}
                );
            }
        });
        return new SocialRouter();
    });

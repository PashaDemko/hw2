
define(['views/index', 'views/register', 'views/login','models/Account',
        'views/contacts', 'collections/Contacts',  'views/addcontact', 'views/admin'],
    function(IndexView, RegisterView, LoginView, Account,
             ContactsView, ContactCollection, AddContactView, Admin) {

        var AppRouter = Backbone.Router.extend({
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
                var model = new Account();
                model.fetch({success: function(){
                    var Model = model.toJSON();
                    if (Model.admin == true){
                        that.changeView(new Admin({model: model}))
                    }
                    else
                    that.changeView(new IndexView({ model: model}))
                }});
            },

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
        return new AppRouter();
    });

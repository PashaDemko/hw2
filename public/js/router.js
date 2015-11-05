define([
    'views/index',
    'views/register',
    'views/login',
    'models/Account',
    'models/authorise',
    'views/contacts/addcontact',
    'views/admin/admin'
], function(IndexView, RegisterView, LoginView, Account, Entry, AddContactView, Admin) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'check',
            'addcontact': 'addcontact',
            "index": "index",
            "login": "login",
            "register": "register"
        },

        check: function () {

            var entry = new Entry();
            entry.fetch({
                success: function() {
                    window.location.hash = 'index';
                },
                error: function() {
                    window.location.hash = 'login';
                }});

        },

        changeView: function(view) {
            if (this.currentView ) {
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
        }
    });

    return AppRouter;
});

define([
    'views/account/index',
    'views/register',
    'views/login',
    'models/Account',
    'models/authorise',
    'views/contacts/addcontact',
    'views/admin/admin',
    'views/account/editprofile',
    'views/menu',
    'views/home'
], function (IndexView, RegisterView, LoginView, Account, Entry, AddContactView, Admin, editProfile, Menu, Home) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'check',
            'addcontact': 'addContact',
            "index": "index",
            "login": "login",
            "home": "home",
            "register": "register",
            "quit": "quit",
            "editProfile": "editProfile"
        },

        initialize: function () {

            this.entry = new Entry();
            this.fetchEntry = this.entry.fetch({
                success: function () {
                    new Menu({authenticated: true}).render();
                },
                error: function () {
                    new Menu({authenticated: false}).render();
                }
            });

        },

        home: function () {
            this.fetchEntry.complete(function () {
                new Home().render();
            });
        },

        editProfile: function () {
            var that = this;
            var model = new Account();
            model.fetch({
                success: function () {
                    that.changeView(new editProfile({model: model}));
                }
            });
        },

        quit: function () {
            var entry = new Entry({_id: "me"});

            entry.destroy();
            this.initialize();

            Backbone.history.fragment = '';
            Backbone.history.navigate('#home', {trigger: true});
        },

        check: function () {
            var entry = new Entry();

            entry.fetch({
                success: function () {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#index', {trigger: true});
                },
                error: function () {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#home', {trigger: true});
                }
            });
        },

        changeView: function (view) {

            if (this.currentView) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();

        },


        addContact: function () {
            var that = this;
            this.fetchEntry.complete(function () {
                that.changeView(new AddContactView());
            })
        },

        index: function () {

            var that = this;
            var model = new Account();

            this.initialize();

            this.fetchEntry.complete(function () {
                model.fetch({
                    success: function () {
                        var Model = model.toJSON();
                        if (Model.admin == true) {
                            that.changeView(new Admin({model: model}))
                        }
                        else that.changeView(new IndexView({model: model}))
                    }
                });
            });

        },

        login: function () {
            this.fetchEntry.complete(function () {
                new LoginView().render();
            });
        },

        register: function () {
            var that = this;
            this.fetchEntry.complete(function () {
                that.changeView(new RegisterView());
            });
        }
    });

    return AppRouter;
});

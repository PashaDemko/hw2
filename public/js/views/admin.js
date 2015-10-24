define(['text!templates/admin.html', 'collections/users', 'views/user',  'models/authorise'],
    function(indexTemplate,  Users, UserView,  Entry) {


        var adminView = Backbone.View.extend({

            el: $('#content'),

            template: _.template(indexTemplate),

            events: {
                "click .QuitBtn": 'quit'
            },

            initialize: function (options) {

                this.renderUsers();

            },

            renderUsers: function (){

                var usersCollection = new Users();

                usersCollection.fetch({success: function (){
                    _.each(usersCollection.toJSON(), function(user){
                        var viewUser =  new UserView({model: user}).render().el;
                        $('.users_list').append(viewUser);
                    })
                }})

            },

            quit: function(){

                var entry = new Entry({_id: "me"});
                entry.destroy();
                window.location.hash = 'login';

            },

            render: function() {
                var model = this.model.toJSON();
                this.$el.html (this.template( {model: model}));
            }
        });

        return adminView
    });

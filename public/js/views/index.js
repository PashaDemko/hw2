define([
      'text!templates/index.html',
      'models/post',
      'collections/posts',
      'views/post/post',
      'models/authorise',
      'collections/Contacts',
      'views/contacts/contact',
      'views/editProfile'
    ],
    function(indexTemplate, Post, Posts,  PostView, Entry, ContactCollection, ContactView, editProfile) {

      var indexView = Backbone.View.extend({

        el: $('#content'),

        template: _.template(indexTemplate),

        events: {
          "submit .add_form": "addPost",
          "click .QuitBtn": 'quit',
          "click .editProfileBtn": 'editProfile'
        },

        initialize: function () {

          this.ContactCollection();
          this.renderPosts();

        },

        editProfile : function() {

          var model = this.model.toJSON();
          var editProfileView = new editProfile({ model: this.model });
          $('.editProf').html(editProfileView.el);

        },

        ContactCollection: function (){

          var contactsCollection = new ContactCollection();

          contactsCollection.fetch({success: function (){
            contactsCollection.each(function(contact){
              var contactHtml = new ContactView({removeButton: true,  model: contact}).render().el;
              $('.contacts_list').append(contactHtml);
            });
          }})

        },

        quit: function(){
          var entry = new Entry({_id: "me"});

          entry.destroy();
          window.location.hash = 'login';
        },

        addPost: function() {

          var data = {
            creator : this.model.get('_id'),
            content : $('#post').val()
          };
          var newPost = new Posts();

          newPost.create(data,{success: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#index', {trigger: true});
          }});

          return false;

        },

        renderPosts: function (){

          var postCollection = this.model.get('posts');
          _.each(postCollection, function (idpost) {
            var postModel = new Post({_id : idpost});

            postModel.fetch({success: function(){
              var postHtml = (new PostView({removeButton: true, editButton: true, model: postModel })).render().el;

              $(postHtml).appendTo('.posts_list');
            }},{wait: true});
          });

        },

        render: function() {

          var model = this.model.toJSON();

          this.$el.html (this.template( {model: model}));
        }
      });

      return indexView
});
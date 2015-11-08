define([
      'text!templates/account/index.html',
      'models/post',
      'collections/posts',
      'views/post/post',
      'models/authorise',
      'collections/Contacts',
      'views/contacts/contact'
    ],
    function(indexTemplate, Post, Posts,  PostView, Entry, ContactCollection, ContactView) {

      var indexView = Backbone.View.extend({

        el: '#contents',

        template: _.template(indexTemplate),

        events: {
          "submit .add_form": "addPost",
          "click .editProfileBtn": 'editProfile',
          'click .posts': 'showPosts',
          'click .contacts': 'showContacts'
        },

        initialize: function () {

          this.contactCollection();
          this.renderPosts();

        },

        showPosts: function() {
          var db = $(this.el).find(".posts_list");
          var dt = $(this.el).find(".showposts");
          db.fadeToggle();
          dt.toggle();
        },

        showContacts: function() {
          var db = $(this.el).find(".contacts_list");
          var dt = $(this.el).find(".showcontacts");
          db.fadeToggle();
          dt.toggle();
        },

        contactCollection: function (){

          var contactsCollection = new ContactCollection();

          contactsCollection.fetch({success: function (){
            contactsCollection.each(function(contact){
              var contactHtml = new ContactView({removeButton: true,  model: contact}).render().el;
              $('.contacts_list').append(contactHtml);
            });
          }})

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

              $('.posts_list').prepend(postHtml);
            }},{wait: true});
          });

        },

        render: function() {

          var model = this.model.toJSON();
          var db;
          var dt;

          this.$el.html (this.template( {model: model}));
          db = $(this.el).find(".contacts_list");
          dt = $(this.el).find(".showcontacts");
          db.hide();
          dt.hide();

          return this;
        }
      });

      return indexView;
});
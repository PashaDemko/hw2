define(['text!templates/index.html', 'models/post', 'collections/posts',
    'views/post', 'models/authorise', 'collections/Contacts', 'views/contacts'],
    function(indexTemplate, Post, Posts,  PostView, Entry, ContactCollection, ContactsView) {


      var indexView = Backbone.View.extend({

        el: $('#content'),

        template: _.template(indexTemplate),

        events: {
          "submit .add_form": "addPost",
          "click .QuitBtn": 'quit'
        },

        initialize: function (options) {

          this.ContactCollection();
          this.renderPosts();

        },

        ContactCollection: function (){

          var contactsCollection = new ContactCollection();
          contactsCollection.fetch({success: function (){
            var viewContact =  new ContactsView({collection: contactsCollection}).render();
          }})
        },

        quit: function(){

          var entry = new Entry({_id: "me"});
          entry.destroy();
          window.location.hash = 'login';

        },

        addPost: function() {

          var that = this;
          var data = {
            creator : this.model.get('_id'),
            content : $('#post').val()
          };
          var newPost = new Posts();

          newPost.create(data,{success: function(){
            that.undelegateEvents();
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
              $('.posts_list').append(postHtml);
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
define([
      'text!templates/account/index.html',
      'text!templates/posts/postCreate.html',
      'models/post',
      'collections/Posts',
      'views/post/post',
      'models/authorise',
      'collections/Contacts',
      'views/contacts/contact'
    ],
    function(indexTemplate, postCreate, Post, Posts,  PostView, Entry, ContactCollection, ContactView) {

      var indexView = Backbone.View.extend({

        el: '#contents',

        template: _.template(indexTemplate),

        events: {
          "click .create": "addPost",
          'click .posts': 'showPosts',
          'click .contacts': 'showContacts',
          'click .showCreate': 'showAdd'
        },

        initialize: function () {

          this.contactCollection();
          this.renderPosts();

        },

        showAdd: function() {
          $(this.el).find(".showAdd").fadeToggle();
        },


        showPosts: function() {
          $(this.el).find(".posts_list").fadeToggle();
          $(this.el).find(".showposts").toggle();
        },

        showContacts: function() {
          $(this.el).find(".contacts_list").fadeToggle();
          $(this.el).find(".showcontacts").toggle();
        },

        contactCollection: function (){

          var contactsCollection = new ContactCollection([], {id : this.model.get('_id')});


          contactsCollection.fetch({success: function (){
            contactsCollection.each(function(contact){
              var contactHtml = new ContactView({posts: true,  model: contact}).render().el;
              $('.contacts_list').append(contactHtml);
            });
          }})

        },

        addPost: function() {
          var that = this;

          var data = {
            creator : this.model.get('_id'),
            content : $('#post').val()
          };
          var postCollection = new Posts([], {id : 'me'});
          postCollection.create(data,{
            success: function(data){
              var a;
              var postHtml = (new PostView({removeButton: true, editButton: true, model: data })).render().el;

              $('.posts_list').prepend(postHtml);
              $(".postCreate").find("textarea").val("");
              a = + $(that.el).find(".postnumber").text()+1;
              $(that.el).find(".postnumber").text(a);
            }
          });

          return false;
        },

        renderPosts: function (){

          var postCollection = new Posts([], {id : this.model.get('_id')});
          postCollection.fetch({
            success: function(){
              _.each(postCollection.toJSON(), function (idpost) {

                var postmodel = new Post(idpost);
                var postHtml = (new PostView({
                      removeButton: true,
                      editButton: true,
                      model: postmodel
                    }
                )).render().el;
                $('.posts_list').prepend(postHtml);
              });
            }
          });


        },

        render: function() {


          var model = this.model.toJSON();

          this.$el.html (this.template( {model: model}));
          $(".postCreate").html (postCreate);
          $(this.el).find(".showAdd").hide();
          $(this.el).find(".contacts_list").hide();
          $(this.el).find(".showcontacts").toggle();
          $(this.el).find(".posts_list").hide();
          $(this.el).find(".showposts").toggle();

          return this;
        }

      });

      return indexView;
});
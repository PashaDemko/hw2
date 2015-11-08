define(['text!templates/posts/editpost.html'], function(editpost){

   var EditPost = Backbone.View.extend({

       template: _.template(editpost),

       initialize: function () {
           this.render();
       },

       events: {
           'submit .edit-post-form'  : 'submit',
           'click button.cancel' : 'cancel'
       },

       submit: function(e) {
           e.preventDefault();
           this.model.save({content: $('#edit_content').val()});

           Backbone.history.fragment = '';
           Backbone.history.navigate('#index', {trigger: true})
       },

       cancel: function(e) {
           e.preventDefault();
           Backbone.history.fragment = '';
           Backbone.history.navigate('#index', {trigger: true});
       },

       render: function () {
           this.$el.html(this.template({ model  : this.model.toJSON() }));
           return this;
       }

   });

    return EditPost;

});
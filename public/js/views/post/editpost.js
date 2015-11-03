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
           this.remove();
       },

       cancel: function() {
           this.remove();
       },

       render: function () {
           this.$el.html(this.template({ model  : this.model.toJSON() }));
           return this;
       }

   });

    return EditPost;

});
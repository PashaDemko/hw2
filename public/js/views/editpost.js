define(['text!templates/editpost.html'], function(editpost){

   var EditPost = Backbone.View.extend({

       template: _.template(editpost),

       initialize: function () {
           this.render();
           this.form = this.$('form');
           this.status = this.form.find('#edit_content');
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
           this.$el.html(this.template({ model  : this.model }));
           return this;
       }

   });

    return EditPost;

});
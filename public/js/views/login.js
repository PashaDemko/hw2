define([
    'models/authorise',
    'text!templates/login.html'
], function(Entry, loginTemplate) {

  var loginView = Backbone.View.extend({

      el: '#content',

      events: {
      "submit .login_form": "login"
      },

      login: function() {
          var that = this;

          var  data = {
              _id: "me",
              email: this.$el.find('#email').val(),
              password: this.$el.find('#password').val()
          };

          var  entry = new Entry(data);

          entry.save( {}
              ,{success : function(data) {
                  window.location.hash = 'index';
              },error: function(){
                  $("#error").text('Unable to login.');
              }} );

          return false;
      },

      render: function() {
          this.$el.html(loginTemplate);

          $("#error").hide();
      }
  });

  return loginView;
});

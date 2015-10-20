define(['models/authentation','SocialNetView', 'text!templates/login.html'], function(Entry, SocialNetView, loginTemplate) {
  var loginView = SocialNetView.extend({
    requireLogin: false,

    el: '#content',

    events: {
      "submit form": "login"
    },



    login: function() {


     var  data = {
         _id: "me",
       email: this.$el.find('#email').val(),
       password: this.$el.find('#password').val()
     }
     var  entry = new Entry(data);
      entry.save( {}
        ,{success : function(data) {
            vent.trigger('app:loggedin', data);
            window.location.hash = 'index';
          },error: function(){
            $("#error").text('Unable to login.');
            $("#error").slideDown();
          }} )
      return false;
    },

    render: function() {
      this.$el.html(loginTemplate);
      $("#error").hide();

    }
  });

  return loginView;
});

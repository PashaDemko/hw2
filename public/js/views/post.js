define(['text!templates/post.html', 'models/Post', 'views/editpost'], function(postTemplate, Post, editPost) {
  var postView = Backbone.View.extend({

    template: _.template(postTemplate),

    events: {
      'click .removeBtn': 'remove',
      'click .editBtn': 'editPost'
    },


    initialize: function(){

      this.model.on('change', this.render, this);
      this.render();

    },


    remove: function(e){

      var targetEl = $(e.target);
      var tr = targetEl.closest('tr');
      var id = tr.attr('id');
      var post = new Post({_id: id});

      post.destroy({
        success: function(){tr.remove();},
        error: function(){alert('error');}
      });

      return false;
    },

    editPost: function() {

      var model =this.model.toJSON();
      var editPostView = new editPost({ model: this.model });
      $('.'+ model._id).html(editPostView.el);

    },

    render: function() {

      var model = this.model.toJSON();
      this.$el.html(this.template({ model: model }));
      return this;

    }

  });

  return postView;
});

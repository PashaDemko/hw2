define(['text!templates/post.html', 'models/Post', 'views/editpost'], function(postTemplate, Post, editPost) {
  var postView = Backbone.View.extend({

    editButton: false,
    removeButton: false,

    template: _.template(postTemplate),

    events: {
      'click .removeBtn': 'remove',
      'click .editBtn': 'editPost'
    },


    initialize: function(options){

      this.model.on('change', this.render, this);
      this.render();
      this.options = options;
      if ( this.options.editButton ) {
        this.editButton = this.options.editButton;
      }
      if ( this.options.removeButton ) {
        this.removeButton = this.options.removeButton;
      }

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
      console.log(model);
      var editPostView = new editPost({ model: this.model });
      $('.'+ model._id).html(editPostView.el);

    },

    render: function() {

      var model = this.model.toJSON();
      this.$el.html(this.template({ model: model,
        editButton: this.editButton,
        removeButton: this.removeButton}));
      return this;

    }

  });

  return postView;
});

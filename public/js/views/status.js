define(['SocialNetView', 'text!templates/status.html', 'models/statusOriginal'], function(SocialNetView, statusTemplate, Post) {
  var statusView = SocialNetView.extend({


    initialize: function(){

      this.model.on('change', this.render, this);
      //this.render();
    },

    events: {
      'click .removeBtn': 'remove',
      'click .editBtn': 'edit'
    },

    template: _.template(statusTemplate),
    initialize: function(){
      vent.on('statuschanged', this.render, this);
      this.render();
          },
    remove: function(e){
      var targetEl = $(e.target);
      var tr = targetEl.closest('tr');
      var id = tr.attr('id');
      var post = new Post({_id: id});
      post.fetch({success: function(){
        }
          ,err : function(){console.log('WTF');}});
      post.toJSON();
      post.destroy({
        success: function(){
          tr.remove();
        },
        error: function(){
          alert('error');
        }
      })

      return false;
    },

        edit: function() {
          vent.trigger('status:edit', this.model);
        },



    render: function() {

      var model = this.model.toJSON();
      this.$el.html(this.template({ model: model }));
      return this;


    }
  });

  return statusView;
});

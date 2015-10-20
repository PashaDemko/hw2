
define(['text!templates/contacts.html'], function(contacts){
    var userView = Backbone.View.extend({
        tagName: 'ul',
        template: _.template(contacts),

        initialize: function(){


            this.model.on('destroy', this.unrender, this);
            this.model.on('change', this.render, this);
            this.render();

        },

        events: {
            'click a.delete' : 'deleteContact',
            'click a.edit'   : 'editContact'
        },
        editContact: function() {
            vent.trigger('contact:edit', this.model);
        },

        deleteContact: function() {
            this.model.destroy();
        },

        unrender: function(){
            this.remove();
        },

        render: function() {
            var self = this;
            var model = this.model.toJSON()
            self.$el.html(this.template({ model  : model }));
            return self;
        }
    });

    return userView;
});
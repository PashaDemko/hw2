define([], function(){
	var userView = Backbone.View.extend({
		tagName: 'li',


		rendering: function() {
			var self = this;
			self.$el.html(this.model.get('username'));
			return self;
		}
	});

	return userView;
});
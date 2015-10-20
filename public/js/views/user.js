define([], function(){
	var userView = Backbone.View.extend({
		tagName: 'li',


		rendering: function() {
			var self = this;
			self.$el.html(this.model.get('name_first')+" " +this.model.get('name_last'));
			return self;
		}
	});

	return userView;
});
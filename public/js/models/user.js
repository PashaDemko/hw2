define([], function(){
	var Model = Backbone.Model.extend({
		idAttributes: '_id',

		urlRoot: '/user'

	});

	return Model;
	//return 'Hello';
});

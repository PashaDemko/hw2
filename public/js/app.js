define( ['router'] , function(){
	function initial(){
		window.vent = _.extend({}, Backbone.Events);

		Backbone.history.start();





	}

	return {
		initial : initial
	}
});
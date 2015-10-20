var App = App || {};

require.config({
	paths: {
		Backbone: 'libs/backbone/backbone',
		Underscore: 'libs/underscore/underscore',
		jQuery: 'libs/jquery/dist/jquery',

		text: 'libs/text/text'
	},
	shim: {
		Backbone: ['Underscore', 'jQuery'],
		app: ['Backbone'],
		router: ['Backbone']
	}
});






require(['app'], function (app) {

	app.initial();
});

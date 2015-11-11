require.config({
    paths: {
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        Bootstrap : 'libs/bootstrap/dist/js/bootstrap.min',
        text: 'libs/text/text',
        templates: '../templates'
    },
    shim: {
        Bootstrap : ['jQuery'] ,
        Backbone: ['Underscore', 'Bootstrap'],
        'app': ['Backbone']
    }
});

require(['app'], function (app) {
    app.initialize();
});
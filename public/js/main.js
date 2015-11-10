require.config({
    paths: {
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        bootstrap : 'libs/bootstrap/dist/js/bootstrap.min',
        text: 'libs/text/text',
        templates: '../templates'
    },
    shim: {
        bootstrap : ['jQuery'] ,
        Backbone: ['Underscore', 'bootstrap'],
        'app': ['Backbone']
    }
});

require(['app'], function (app) {
    app.initialize();
});
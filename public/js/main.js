require.config({
    paths: {
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        jQueryUi: 'libs/jquery-ui/jquery-ui',
        text: 'libs/text/text',
        templates: '../templates'
    },
    shim: {
        jQueryUi: ['jQuery'],
        Backbone: ['Underscore', 'jQueryUi'],
        'app': ['Backbone']
    }
});

require(['app'], function(app) {
    app.initialize();
});
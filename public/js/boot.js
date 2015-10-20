/**
 * Created by Паша on 10.10.2015.
 */
require.config({
    paths: {
        Backbone: 'libs/backbone/backbone',
        Underscore: 'libs/underscore/underscore',
        jQuery: 'libs/jquery/dist/jquery',
        text: 'libs/text/text',
        templates: '../templates'

    },
    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'SocialNet': ['Backbone'],
        router: ['Backbone']
    }
});
require(['SocialNet'], function(SocialNet) {
    SocialNet.initialize();
});
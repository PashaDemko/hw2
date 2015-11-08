define([
        'text!templates/home.html'
    ],
    function(homeTemplate) {

        var mainView = Backbone.View.extend({

            el: '#contents',


            initialize: function(){

            },

            template: _.template(homeTemplate),

            render: function() {
                this.$el.html (this.template());
            }
        });

        return mainView;
    });
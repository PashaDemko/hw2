define([
        'text!templates/main.html',

        'models/authorise'
    ],
    function(indexTemplate, Entry) {

        var mainView = Backbone.View.extend({

            el: $('#content'),

            authenticated: false,


            template: _.template(indexTemplate),

            render: function() {
                var entry = new Entry();
                var that = this;
                entry.fetch({
                        success: function() {
                            that.$el.html (that.template({authenticated:  true}));
                        }

                });
                that.$el.html (that.template({authenticated:  that.authenticated}));

            }
        });

        return mainView
    });

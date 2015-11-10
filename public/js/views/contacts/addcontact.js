define([
        'models/Contact',
        'collections/Contacts',
        'views/contacts/contact',
        'text!templates/contacts/addcontact.html'
    ],
    function (Contact, Contacts, ContactView, addcontactTemplate) {

        var addcontactView = Backbone.View.extend({

            el: '#contents',

            events: {
                "submit .search_form": "search"
            },

            search: function () {

                var that = this;
                var findContact = new Contacts();
                var body = {"searchStr": $('#searchStr').val()};

                findContact.create(body, {
                    success: function (data) {
                        that.render(data.toJSON());
                    }, error: function () {
                        $("#results").text('No contacts found');
                    }
                });

                return false;
            },

            render: function (result) {

                this.$el.html(_.template(addcontactTemplate));
                if (null != result) {
                    var contactModel = new Contact(result);
                    var contactHtml = (new ContactView({addButton: true, model: contactModel})).render().el;

                    $('#results').append(contactHtml);
                }

                return this;
            }

        });

        return addcontactView;
    });

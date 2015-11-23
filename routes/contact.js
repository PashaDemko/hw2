module.exports = (function () {

    var express = require('express');
    var ContactHandler = require('../handlers/contacts');
    var contactRouter = express.Router();
    var contactHandler = new ContactHandler();


    contactRouter.post('/', contactHandler.findContact);
    contactRouter.get('/:id', contactHandler.allcontacts);
    contactRouter.put('/:id', contactHandler.addcontact);
    contactRouter.delete('/:id', contactHandler.delcontact);

    return contactRouter;
})();
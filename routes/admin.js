module.exports = (function () {

    var express = require('express');
    var AdminHandler = require('../handlers/admin');
    var adminRouter = express.Router();
    var adminHandler = new AdminHandler();



    adminRouter.put('/:id', adminHandler.login);
    adminRouter.get('/', adminHandler.admin, adminHandler.allUsers);
    adminRouter.delete('/:id', adminHandler.deleteUser);


    return adminRouter;
})();

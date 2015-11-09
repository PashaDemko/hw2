module.exports = (function () {

    var express = require('express');
    var AdminHandler = require('../handlers/admin');
    var adminRouter = express.Router();
    var adminHandler = new AdminHandler();


    adminRouter.use(adminHandler.admin);
    adminRouter.get('/', adminHandler.allUsers);
    adminRouter.delete('/:id', adminHandler.deleteUser);


    return adminRouter;
})();

module.exports = (function(){

    var express = require('express');
    var AdminHandler = require('../handlers/admin');
    var adminRouter = express.Router();
    var adminHandler = new AdminHandler();


    adminRouter.use( adminHandler.admin);
    adminRouter.get('/', adminHandler.AllUsers);
    adminRouter.delete('/:id', adminHandler.deleteAcc);


    return adminRouter;
})();

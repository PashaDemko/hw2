module.exports = (function(){

    var express = require('express');
    var adminHandler = require('../handlers/admin');
    var adminRouter = express.Router();
    var adminHandler = new adminHandler();




    adminRouter.get('/', adminHandler.getAll);
    adminRouter.post('/delete/:user', adminHandler.delete);
    adminRouter.post('/MegaAdmin/:secretPassword', adminHandler.newAdmin);


    return adminRouter;
})();
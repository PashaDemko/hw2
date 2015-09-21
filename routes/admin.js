module.exports = (function(){


    var express = require('express');
    var adminHandler = require('../handlers/admin');
    var UserHandler = require('../handlers/user');
    var userHandler = new UserHandler();
    var adminRouter = express.Router();
    var adminHandler = new adminHandler();
    var SupaAdmin = '/:id';

    adminRouter.use(SupaAdmin, adminHandler.profile);

    adminRouter.get(SupaAdmin, adminHandler.getAll);
    adminRouter.delete(SupaAdmin, adminHandler.delete);
    adminRouter.post(SupaAdmin, adminHandler.deletePost);


    return adminRouter;
})();
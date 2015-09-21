module.exports = (function(){

    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler();
    var adminRouter = require('./admin')
    var friend = '/:id/friend';




    userRouter.use('/a', adminRouter);
    userRouter.get('/:id', userHandler.profile);
    userRouter.post('/', userHandler.createUser);
    userRouter.post('/:id', userHandler.edit);

    userRouter.post(friend, userHandler.addfriend);
    userRouter.delete(friend, userHandler.delfriend);
    userRouter.get(friend, userHandler.friends);

    return userRouter;
})();
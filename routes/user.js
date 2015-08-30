module.exports = (function(){

    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler();

    

    var postRouter = require ('./post');


    userRouter.use('/post', postRouter);
    userRouter.get('/', userHandler.profile);
    userRouter.post('/add/:friend', userHandler.addfriend);
    userRouter.post('/:login/:password', userHandler.createUser);
    userRouter.post('/delete', userHandler.delete);

    return userRouter;
})();

module.exports = (function(){

    var express = require('express');
    var AccountHandler = require('../handlers/account');
    var accountRouter = express.Router();
    var accountHandler = new AccountHandler();


    var postRouter = require('./post');
    var contactRouter = require('./contact');

    accountRouter.use('/', accountHandler.access);
   accountRouter.get('/', accountHandler.me);

    accountRouter.use('/contacts', contactRouter);
    accountRouter.use('/posts', postRouter);

    return accountRouter;

})();
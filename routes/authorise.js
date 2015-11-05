module.exports = (function(){

    var express = require ('express');
    var AuthHandler =  require('../handlers/authorise');
    var authRouter = express.Router();
    var authHandler = new AuthHandler();


    authRouter.put('/:id', authHandler.login);
    authRouter.delete('/:id', authHandler.exit);
    authRouter.post('/', authHandler.register);
    authRouter.get('/', authHandler.authenticated);

    return authRouter;
})();
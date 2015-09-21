module.exports = (function(){

express = require ('express');


    var UserHandler = require('../handlers/user');
    var userHandler = new UserHandler();
    var PostHandler = require('../handlers/post');
    var postRouter = express.Router();
    var postHandler = new PostHandler();



  postRouter.get('/:id', postHandler.showAll);
   postRouter.post('/:id', postHandler.create);
   postRouter.delete('/:id', postHandler.delete);
   postRouter.post('/:id/edit', postHandler.edit);



return postRouter;})();
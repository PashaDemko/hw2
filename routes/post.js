module.exports = (function(){

express = require ('express');


    var UserHandler = require('../handlers/user');
    var userHandler = new UserHandler();
    var PostHandler = require('../handlers/post');
    var postRouter = express.Router();
    var postHandler = new PostHandler();



  postRouter.get('/:id', postHandler.show);
    postRouter.get('/', postHandler.showAll);
   postRouter.post('/', postHandler.create);
   postRouter.delete('/:id', postHandler.delete);
   postRouter.put('/:id', postHandler.edit);



return postRouter;})();
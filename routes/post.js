module.exports = (function () {


    var express = require('express');
    var PostHandler = require('../handlers/post');
    var postRouter = express.Router();
    var postHandler = new PostHandler();


    postRouter.post('/', postHandler.create);
    postRouter.get('/:id', postHandler.post);
    postRouter.put('/:id', postHandler.edit);
    postRouter.delete('/:id', postHandler.delete);


    return postRouter;
})();

module.exports = (function(){
express = require ('express');

var postRouter = express.Router();
var PostHandler = require('../handlers/post');
var postHandler = new PostHandler();


    postRouter.get('/', postHandler.getAll);
    postRouter.post('/create/:text', postHandler.create);
    postRouter.post('/delete/:number', postHandler.delete);
    postRouter.post('/edit/:number/:newtext', postHandler.edit);


return postRouter;})();
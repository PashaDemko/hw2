/**
 * Created by Паша on 14.10.2015.
 */
module.exports = (function(){


    var express = require('express');
    var StatusHandler = require('../handlers/status');
    var statusRouter = express.Router();
    var statusHandler = new StatusHandler();



    statusRouter.get('/:id', statusHandler.status);
     statusRouter.get('/', statusHandler.all);
    statusRouter.post('/', statusHandler.create);
    statusRouter.get('/stat/:id', statusHandler.takebyCreator);
    statusRouter.put('/:id', statusHandler.edit);
    statusRouter.delete('/:id', statusHandler.delete);




    return statusRouter;
})();
/**
 * Created by Паша on 16.10.2015.
 */
module.exports = (function(){

    var express = require('express');
    var authentRouter = express.Router();
    var  AuthentHandler = require('../handlers/accounter');
    var authentHandler = new AuthentHandler();
    var statusRouter = require('./status');
    var acc = '/accounts/:id';
    var status = acc + '/status';
    var contact = acc + '/contact';



    authentRouter.put('/authorise/:id', authentHandler.login);
    authentRouter.post('/authorise', authentHandler.register);
    authentRouter.get('/authorise', authentHandler.authenticated);
    authentRouter.delete('/authorise/:id', authentHandler.outauth);


    authentRouter.get(acc, authentHandler.me);
    authentRouter.get(acc +'/activity', authentHandler.activity);

    authentRouter.get(status + '?/:sid', authentHandler.allstatus);
    authentRouter.post(status, authentHandler.newstatus);
    authentRouter.post('/contacts/find', authentHandler.findContact);



    authentRouter.get(contact, authentHandler.allcontacts);
    authentRouter.post(contact, authentHandler.addcontact);
    authentRouter.delete(contact, authentHandler.delcontact);
    authentRouter.use('/status', statusRouter);

    return authentRouter;
})();
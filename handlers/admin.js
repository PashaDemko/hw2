var Admin = function () {

    this.getAll = function (req, res, next) {
        res.status(200).send('List of users');
    }
    this.delete  = function (req, res, next){
        var user = req.params.user;
        res.status(200).send("You deleted user " + user );

    }
    this.newAdmin = function (req, res, next){
        var secretPassword = req.params.secretPassword;
        if (secretPassword == 123)
            res.status(200).send("You are new admin");
        else
            res.status(502).send("wrong password");
    }
}
module.exports = Admin;

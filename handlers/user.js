var User = function () {

    this.profile = function (req, res, next) {
        res.status(200).send("its your profile ");
    }
    this.addfriend  = function (req, res, next){
        var friend = req.params.friend;
        res.status(200).send("You added friend " + friend );

    }
    this.createUser = function (req, res, next) {
        var newlogin = req.params.login;
        var newpassword = req.params.password;

        res.status(200).send({login: newlogin, password: newpassword});
    };
    this.delete = function (req, res, next) {
        res.status(200).send("Your profile was deleted");
       };
    }
module.exports = User;

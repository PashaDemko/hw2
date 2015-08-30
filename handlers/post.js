
var Post = function () {

    this.getAll = function (req, res, next) {
        res.status(200).send("there are your all posts");
    }
    this.create = function (req, res, next){
        var text = req.params.text;
        res.status(200).send("Your new post  " + text );

    }
    this.delete = function (req, res, next) {
        var number = req.params.number;
        res.status(200).send("You deleted post " + number );
    };
    this.edit = function (req, res, next) {
        var number = req.params.number;
        var text = req.params.newtext;

        res.status(200).send("you edited post" + number + "\n new text" + text);
    }
}
module.exports = Post;
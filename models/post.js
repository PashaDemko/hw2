module.exports = function (postGre) {

    var PostModel = postGre.Model.extend({
        tableName: 'posts',

        author: function () {
            return this.belongsTo(postGre.Models.User);
        }
    });

    return PostModel;
};
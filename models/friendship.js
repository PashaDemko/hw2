
module.exports = function (postGre) {

    var friendship = postGre.Model.extend({
        tableName: 'friendships',
        hasTimestamps: true,

        user_id: function()
    {
        return this.belongsTo(User);
    }
    ,

    friend_id: function ()
    {
        return this.belongsTo(User, 'friendId');
    }

}
)
;

    return friendship;
}


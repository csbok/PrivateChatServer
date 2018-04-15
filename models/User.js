'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        LoginId: { type: DataTypes.STRING },
        Password: { type: DataTypes.STRING },
        Email: { type: DataTypes.STRING },
        Nickname: { type: DataTypes.STRING },
        avatarFilename: {type: DataTypes.STRING }
    }, {
        classMethods: {
            associate: function (models) {
                User.belongsToMany(models.Room, { through: models.RoomEntry });
            }
        }
    });

    return User;
};
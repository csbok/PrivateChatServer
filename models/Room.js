'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define('Room', {
        Title: { type: DataTypes.STRING },
    }, {
        classMethods: {
            associate: function (models) {
                Room.belongsToMany(models.User, { through: models.RoomEntry });
                Room.hasMany(models.RoomEntry);
            }
        }
    });

    return Room;
};
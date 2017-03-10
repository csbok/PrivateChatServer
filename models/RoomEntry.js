'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var RoomEntry = sequelize.define('RoomEntry', {
        Role: { type: DataTypes.INTEGER },
    }, {
        classMethods: {
            associate: function (models) {
//                RoomEntry.belongsTo(models.Room);
                RoomEntry.belongsTo(models.User);
            }
        }
    });


    return RoomEntry;
};
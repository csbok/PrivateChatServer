'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        Message: { type: DataTypes.STRING }
    }, {
        classMethods: {
            associate: function (models) {
                Message.belongsTo(models.Room);
                Message.belongsTo(models.User);

            }
        }
    });

    return Message;
};
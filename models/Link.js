'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Link = sequelize.define('Link', {
    }, {
        classMethods: {
            associate: function (models) {
                Link.belongsTo(models.User)
            }
        }
    });

    return Link;
};
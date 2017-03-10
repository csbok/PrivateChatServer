'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var File = sequelize.define('File', {
    }, {
        classMethods: {
            associate: function (models) {
                File.belongsTo(models.User)
            }
        }
    });

    return File;
};
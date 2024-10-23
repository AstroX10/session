const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Data = sequelize.define('Data', {
 content: { type: DataTypes.TEXT, allowNull: false },
});
module.exports = Data;

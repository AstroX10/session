const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Session = sequelize.define('Session', {
 sessionKey: { type: DataTypes.STRING, allowNull: false, unique: true },
 filePath: { type: DataTypes.STRING, allowNull: false },
});
module.exports = Session;

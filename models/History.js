const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const History = sequelize.define('History', {
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

History.belongsTo(User, { foreignKey: 'userId' });

module.exports = History;
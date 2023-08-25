const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const PhotographsImg = db.define('photographsImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  photographsImgUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photographsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = PhotographsImg;

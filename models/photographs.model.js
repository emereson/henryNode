const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Photographs = db.define('photographs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleEng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateEng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photographsFrontPage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  galleryStyle: {
    type: DataTypes.ENUM('row', 'column'),
    allowNull: false,
    defaultValue: 'row',
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Photographs;

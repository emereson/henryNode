const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const StoriesSlice = db.define('storiesSlice', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  numberTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  titleEng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionEng: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = StoriesSlice;

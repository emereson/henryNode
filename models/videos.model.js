const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Videos = db.define('videos', {
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
  previewVideoUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  previewvideourl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Videos;

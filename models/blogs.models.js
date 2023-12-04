const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Blog = db.define('blog', {
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
  paragraph1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph1Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph2Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph3Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph4Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph5: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph5Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph6: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paragraph6Eng: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  couplesName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogImg1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blogImg2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blogImg3: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Blog;

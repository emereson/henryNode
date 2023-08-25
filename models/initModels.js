const DataPhotographs = require('./dataPhotographs.model');
const Photographs = require('./photographs.model');
const PhotographsImg = require('./photographsImg.model');
const DataVideos = require('./dataVideos.model');
const Videos = require('./videos.model');

const initModel = () => {
  Photographs.hasMany(DataPhotographs, { foreignKey: 'photographId' });
  DataPhotographs.belongsTo(Photographs, { foreignKey: 'photographId' });

  Photographs.hasMany(PhotographsImg, { foreignKey: 'photographsId' });
  PhotographsImg.belongsTo(Photographs, { foreignKey: 'photographsId' });

  Videos.hasMany(DataVideos, { foreignKey: 'videoId' });
  DataVideos.belongsTo(Videos, { foreignKey: 'videoId' });
};

module.exports = initModel;

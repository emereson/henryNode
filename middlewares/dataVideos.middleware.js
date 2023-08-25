const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const DataVideos = require('../models/dataVideos.model');

exports.validExistDataVideos = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const dataVideo = await DataVideos.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!dataVideo) {
    return next(new AppError(`data of the data od the Video not found`, 404));
  }
  req.dataVideo = dataVideo;
  next();
});

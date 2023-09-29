const Videos = require('../models/videos.model');
const DataVideos = require('../models/dataVideos.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistVideos = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const videos = await Videos.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: DataVideos,
        where: {
          status: 'active',
        },
      },
    ],
  });

  if (!videos) {
    return next(new AppError(`videos with id: ${id} not found `, 404));
  }

  req.videos = videos;
  req.DataVideos = videos.DataVideos;
  next();
});

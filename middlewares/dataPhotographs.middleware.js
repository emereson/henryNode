const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const DataPhotographs = require('../models/dataPhotographs.model');

exports.validExistDataPhotographs = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const photography = await DataPhotographs.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!photography) {
    return next(new AppError(`data of the Photographs not found`, 404));
  }
  req.photography = photography;
  next();
});

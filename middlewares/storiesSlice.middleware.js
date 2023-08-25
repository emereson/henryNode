const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const StoriesSlice = require('../models/storiesSlice.model');

exports.validExistStoriesSlice = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const storiesSlice = await StoriesSlice.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!storiesSlice) {
    return next(new AppError(`storiesSlice not found`, 404));
  }
  req.storiesSlice = storiesSlice;
  next();
});

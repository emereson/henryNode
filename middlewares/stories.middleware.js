const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Stories = require('../models/stories.model');

exports.validExistStories = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const stories = await Stories.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!stories) {
    return next(new AppError(`stories not found`, 404));
  }
  req.stories = stories;
  next();
});

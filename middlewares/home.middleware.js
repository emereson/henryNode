const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Home = require('../models/home.model');

exports.validExistHome = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const home = await Home.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!home) {
    return next(new AppError(`home not found`, 404));
  }
  req.home = home;
  next();
});

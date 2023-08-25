const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Photographs = require('../models/photographs.model');
const DataPhotographs = require('../models/dataPhotographs.model');
const PhotographsImg = require('../models/photographsImg.model');

exports.validExistPhotographs = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const photographs = await Photographs.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: DataPhotographs,
      },
      {
        model: PhotographsImg,
      },
    ],
  });
  if (!photographs) {
    return next(new AppError(`photographs not found`, 404));
  }
  req.photographs = photographs;
  req.PhotographsImg = photographs.PhotographsImg;
  req.DataPhotographs = photographs.DataPhotographs;
  next();
});

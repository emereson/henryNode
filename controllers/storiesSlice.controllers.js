const catchAsync = require('../utils/catchAsync');
const StoriesSlice = require('../models/storiesSlice.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const storiesSlice = await StoriesSlice.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: storiesSlice.length,
    storiesSlice,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { storiesSlice } = req;

  return res.status(200).json({
    status: 'success',
    storiesSlice,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { numberTitle, title, description, titleEng, descriptionEng } =
    req.body;

  const storiesSlice = await StoriesSlice.create({
    title,
    numberTitle,
    titleEng,
    descriptionEng,
    description,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'storiesSlice created successfully',
    storiesSlice,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { storiesSlice } = req;
  const { numberTitle, title, description, titleEng, descriptionEng } =
    req.body;

  await storiesSlice.update({
    title,
    numberTitle,
    description,
    titleEng,
    descriptionEng,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'storiesSlice created successfully',
    storiesSlice,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { storiesSlice } = req;

  await storiesSlice.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'stories has been delete',
    stories,
  });
});

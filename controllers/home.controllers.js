const catchAsync = require('../utils/catchAsync');
const Home = require('../models/home.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const home = await Home.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: home.length,
    home,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { home } = req;

  return res.status(200).json({
    status: 'success',
    home,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const videoBuffer = req.files['homeVideoUrl'][0]; // Multer ya procesó la subida y guardó los archivos
  const videoFilename = videoBuffer.filename;

  const home = await Home.create({
    homeVideoUrl: videoFilename,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'home created successfully',
    home,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { home } = req;
  const videoBuffer = req.files['homeVideoUrl'][0]; // Multer ya procesó la subida y guardó los archivos
  const videoFilename = videoBuffer.filename;

  await home.update({
    homeVideoUrl: videoFilename,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'home created successfully',
    home,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { home } = req;

  await home.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'home has been delete',
    home,
  });
});

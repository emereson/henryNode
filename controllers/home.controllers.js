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

  const host = req.get('host');
  const protocol = req.protocol;
  const videoUrl = `${protocol}://${host}/api/v1/uploads/${videoFilename}`;

  const home = await Home.create({
    homeVideoUrl: videoUrl,
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

  const host = req.get('host');
  const protocol = req.protocol;
  const videoUrl = `${protocol}://${host}/api/v1/uploads/${videoFilename}`;

  await home.update({
    homeVideoUrl: videoUrl,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'home update successfully',
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

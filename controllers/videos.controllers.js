const catchAsync = require('../utils/catchAsync');
const Videos = require('../models/videos.model');
const DataVideos = require('../models/dataVideos.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const videos = await Videos.findAll({
    where: {
      status: 'active',
    },
    include: {
      model: DataVideos,
    },
  });
  return res.status(200).json({
    status: 'success',
    results: videos.length,
    videos,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { videos } = req;

  return res.status(200).json({
    status: 'success',
    videos,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, titleEng, date, dateEng } = req.body;

  const videoBuffer = req.files['videoUrl'][0]; // Multer ya procesó la subida y guardó los archivos
  const videoFilename = videoBuffer.filename; // Utiliza el nombre de archivo generado por Multer

  const imgBuffer = req.files['videosimgUrl'][0]; // Igual que con el video
  const imgFilename = imgBuffer.filename;

  const videos = await Videos.create({
    title,
    titleEng,
    date,
    dateEng,
    videoUrl: `${req.protocol}://${req.get(
      'host'
    )}/api/v1//uploads/${videoFilename}`,
    videosimgUrl: `${req.protocol}://${req.get(
      'host'
    )}/api/v1//uploads/${imgFilename}`,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'Videos created successfully',
    videos,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { title, titleEng, date, dateEng } = req.body;

  const videoBuffer = req.files['videoUrl'][0];
  const videoFilename = videoBuffer.filename;

  const imgBuffer = req.files['videosimgUrl'][0];
  const imgFilename = imgBuffer.filename;

  const videos = await Videos.update({
    title,
    titleEng,
    date,
    dateEng,
    videoUrl: `${req.protocol}://${req.get('host')}/uploads/${videoFilename}`,
    videosimgUrl: `${req.protocol}://${req.get('host')}/uploads/${imgFilename}`,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'videos created successfully',
    videos,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { videos } = req;

  await videos.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'videos has been delete',
    videos,
  });
});

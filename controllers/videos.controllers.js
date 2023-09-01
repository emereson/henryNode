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

  const videoBuffer = req.files['videoUrl'][0];
  const videoFilename = videoBuffer.filename;

  const imgBuffer = req.files['videosimgUrl'][0];
  const imgFilename = imgBuffer.filename;

  const host = req.get('host');
  const protocol = req.protocol;

  const videoUrl = `${protocol}://${host}/api/v1/uploads/${videoFilename}`;
  const imgUrl = `${protocol}://${host}/api/v1/uploads/${imgFilename}`;

  const videos = await Videos.create({
    title,
    titleEng,
    date,
    dateEng,
    videoUrl,
    videosimgUrl: imgUrl,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'videos created successfully',
    videos,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { title, titleEng, date, dateEng } = req.body;

  const videos = await Videos.update({
    title,
    titleEng,
    date,
    dateEng,
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

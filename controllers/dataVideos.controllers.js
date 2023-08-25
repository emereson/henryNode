const catchAsync = require('../utils/catchAsync');
const DataVideos = require('../models/dataVideos.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const dataVideos = await DataVideos.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: dataVideos.length,
    dataVideos,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { dataVideo } = req;

  return res.status(200).json({
    status: 'success',
    dataVideo,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, description, titleEng, descriptionEng, link } = req.body;
  const { id } = req.params;

  const dataVideos = await DataVideos.create({
    title,
    description,
    titleEng,
    descriptionEng,
    link,
    videoId: id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'data of the  Videos created successfully',
    dataVideos,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { dataVideo } = req;
  const { title, description, titleEng, descriptionEng, link } = req.body;

  await dataVideo.update({
    title,
    description,
    titleEng,
    descriptionEng,
    link,
  });

  return res.status(200).json({
    status: 'success',
    message: 'data of the Video has been updated',
    dataVideo,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { dataVideo } = req;

  await dataVideo.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'data of the Video has been delete',
    dataVideo,
  });
});

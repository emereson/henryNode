const catchAsync = require('../utils/catchAsync');
const DataPhotographs = require('../models/dataPhotographs.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const dataPhotographs = await DataPhotographs.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: dataPhotographs.length,
    dataPhotographs,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { photography } = req;

  return res.status(200).json({
    status: 'success',
    photography,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, description, titleEng, descriptionEng, link } = req.body;
  const { id } = req.params;

  const dataPhotographs = await DataPhotographs.create({
    title,
    description,
    titleEng,
    descriptionEng,
    link,
    photographId: id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'data of the photography created successfully',
    dataPhotographs,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { photography } = req;
  const { title, description, titleEng, descriptionEng, link } = req.body;

  await photography.update({
    title,
    description,
    titleEng,
    descriptionEng,
    link,
  });

  return res.status(200).json({
    status: 'success',
    message: 'data of the photography has been updated',
    photography,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { photography } = req;

  await photography.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'data of the photography has been delete',
    photography,
  });
});

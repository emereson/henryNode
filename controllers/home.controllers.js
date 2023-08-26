const catchAsync = require('../utils/catchAsync');
const Home = require('../models/home.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

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
  const videoRef = ref(
    storage,
    `homeVideoUrl/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(videoRef, req.file.buffer);

  const home = await Home.create({
    homeVideoUrl: await getDownloadURL(videoRef),
  });

  return res.status(201).json({
    status: 'Success',
    message: 'home created successfully',
    home,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { home } = req;
  const videoRef = ref(
    storage,
    `homeVideoUrl/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(videoRef, req.file.buffer);

  await home.update({
    homeVideoUrl: await getDownloadURL(videoRef),
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

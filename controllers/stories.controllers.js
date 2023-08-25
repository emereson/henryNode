const catchAsync = require('../utils/catchAsync');
const Stories = require('../models/stories.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.findAll = catchAsync(async (req, res, next) => {
  const stories = await Stories.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: stories.length,
    stories,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { stories } = req;

  return res.status(200).json({
    status: 'success',
    stories,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const imgRef = ref(
    storage,
    `storiesImgUrl/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(imgRef, req.file.buffer);

  const stories = await Stories.create({
    title,
    storiesImgUrl: await getDownloadURL(imgRef),
  });

  return res.status(201).json({
    status: 'Success',
    message: 'stories created successfully',
    stories,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { stories } = req;
  const { title } = req.body;

  const imgRef = ref(
    storage,
    `storiesImgUrl/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(imgRef, req.file.buffer);

  await stories.update({
    title,
    storiesImgUrl: await getDownloadURL(imgRef),
  });

  return res.status(201).json({
    status: 'Success',
    message: 'stories created successfully',
    stories,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { stories } = req;

  await stories.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'stories has been delete',
    stories,
  });
});

const catchAsync = require('../utils/catchAsync');
const Videos = require('../models/videos.model');
const DataVideos = require('../models/dataVideos.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

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

  const videoBuffer = req.files['videoUrl'][0].buffer;
  const videoRef = ref(
    storage,
    `videoUrl/${Date.now()}-${req.files['videoUrl'][0].originalname}`
  );
  await uploadBytes(videoRef, videoBuffer);

  const imgBuffer = req.files['videosimgUrl'][0].buffer;
  const imgRef = ref(
    storage,
    `videosimgUrl/${Date.now()}-${req.files['videosimgUrl'][0].originalname}`
  );
  await uploadBytes(imgRef, imgBuffer);

  const videos = await Videos.create({
    title,
    titleEng,
    date,
    dateEng,
    videoUrl: await getDownloadURL(videoRef),
    videosimgUrl: await getDownloadURL(imgRef),
  });

  return res.status(201).json({
    status: 'Success',
    message: 'Videos created successfully',
    videos,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { videos } = req;
  const { title, titleEng, date, dateEng } = req.body;
  const videoBuffer = req.files['videoUrl'][0].buffer;
  const videoRef = ref(
    storage,
    `videoUrl/${Date.now()}-${req.files['videoUrl'][0].originalname}`
  );
  await uploadBytes(videoRef, videoBuffer);

  const imgBuffer = req.files['videosimgUrl'][0].buffer;
  const imgRef = ref(
    storage,
    `videosimgUrl/${Date.now()}-${req.files['videosimgUrl'][0].originalname}`
  );
  await uploadBytes(imgRef, imgBuffer);

  await videos.update({
    title,
    titleEng,
    date,
    dateEng,
    videoUrl: await getDownloadURL(videoRef),
    imgUrl: await getDownloadURL(imgRef),
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

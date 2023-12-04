const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blogs.models');

exports.findAll = catchAsync(async (req, res, next) => {
  const blogs = await Blog.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'success',
    results: blogs.length,
    blogs,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { blog } = req;

  return res.status(200).json({
    status: 'success',
    blog,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const {
    title,
    titleEng,
    paragraph1,
    paragraph1Eng,
    paragraph2,
    paragraph2Eng,
    paragraph3,
    paragraph3Eng,
    paragraph4,
    paragraph4Eng,
    paragraph5,
    paragraph5Eng,
    paragraph6,
    paragraph6Eng,
    couplesName,
  } = req.body;

  const img1Buffer = req.files['blogimg1'][0];
  const img1Filename = img1Buffer.filename;

  const img2Buffer = req.files['blogimg2'][0];
  const img2Filename = img2Buffer.filename;

  const img3Buffer = req.files['blogimg3'][0];
  const img3Filename = img3Buffer.filename;

  const host = req.get('host');
  const protocol = req.protocol;

  const img1Url = `${protocol}://${host}/api/v1/images/${img1Filename}`;
  const img2Url = `${protocol}://${host}/api/v1/images/${img2Filename}`;
  const img3Url = `${protocol}://${host}/api/v1/images/${img3Filename}`;

  const blog = await Blog.create({
    title,
    titleEng,
    paragraph1,
    paragraph1Eng,
    paragraph2,
    paragraph2Eng,
    paragraph3,
    paragraph3Eng,
    paragraph4,
    paragraph4Eng,
    paragraph5,
    paragraph5Eng,
    paragraph6,
    paragraph6Eng,
    couplesName,
    blogImg1: img1Url,
    blogImg2: img2Url,
    blogImg3: img3Url,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'data of the blog created successfully',
    blog,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { blog } = req;
  const {
    title,
    titleEng,
    paragraph1,
    paragraph1Eng,
    paragraph2,
    paragraph2Eng,
    paragraph3,
    paragraph3Eng,
    paragraph4,
    paragraph4Eng,
    paragraph5,
    paragraph5Eng,
    paragraph6,
    paragraph6Eng,
    couplesName,
  } = req.body;

  const img1Buffer = req.files['blogimg1'][0];
  const img1Filename = img1Buffer.filename;

  const img2Buffer = req.files['blogimg2'][0];
  const img2Filename = img2Buffer.filename;

  const img3Buffer = req.files['blogimg3'][0];
  const img3Filename = img3Buffer.filename;

  const host = req.get('host');
  const protocol = req.protocol;

  const img1Url = `${protocol}://${host}/api/v1/images/${img1Filename}`;
  const img2Url = `${protocol}://${host}/api/v1/images/${img2Filename}`;
  const img3Url = `${protocol}://${host}/api/v1/images/${img3Filename}`;

  await blog.update({
    title,
    titleEng,
    paragraph1,
    paragraph1Eng,
    paragraph2,
    paragraph2Eng,
    paragraph3,
    paragraph3Eng,
    paragraph4,
    paragraph4Eng,
    paragraph5,
    paragraph5Eng,
    paragraph6,
    paragraph6Eng,
    couplesName,
    blogImg1: img1Url,
    blogImg2: img2Url,
    blogImg3: img3Url,
  });

  return res.status(200).json({
    status: 'success',
    message: 'data of the blog has been updated',
    blog,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { blog } = req;

  await blog.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'data of the blog has been delete',
    blog,
  });
});

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blogs.models');

exports.validExistBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!blog) {
    return next(new AppError(`data of the blog not found`, 404));
  }
  req.blog = blog;
  next();
});

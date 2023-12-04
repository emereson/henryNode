const express = require('express');
const { upload } = require('../utils/multerPhotos');

const blogsMiddleware = require('../middlewares/blogs.middlewares');
const blogsController = require('../controllers/blogs.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', blogsController.findAll);
router.get('/:id', blogsMiddleware.validExistBlog, blogsController.findOne);

router.use(authMiddleware.protect);
router.post(
  '/',
  upload.fields([
    { name: 'blogimg1', maxCount: 1 },
    { name: 'blogimg2', maxCount: 1 },
    { name: 'blogimg3', maxCount: 1 },
  ]),
  blogsController.create
);
router
  .route('/:id')
  .patch(
    upload.fields([
      { name: 'blogimg1', maxCount: 1 },
      { name: 'blogimg2', maxCount: 1 },
      { name: 'blogimg3', maxCount: 1 },
    ]),
    blogsMiddleware.validExistBlog,
    blogsController.update
  )
  .delete(blogsMiddleware.validExistBlog, blogsController.delete);

module.exports = router;

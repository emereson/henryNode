const express = require('express');

const { upload } = require('../utils/multer');
const videosMiddleware = require('../middlewares/videos.middleware');
const videosController = require('../controllers/videos.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', videosController.findAll);
router.get('/:id', videosMiddleware.validExistVideos, videosController.findOne);

router.use(authMiddleware.protect);
router.post(
  '/',
  upload.fields([
    { name: 'videoUrl', maxCount: 1 },
    { name: 'videosimgUrl', maxCount: 1 },
  ]),
  videosController.create
);
router
  .route('/:id')
  .patch(
    upload.fields([
      { name: 'videoUrl', maxCount: 1 },
      { name: 'videosimgUrl', maxCount: 1 },
    ]),
    videosMiddleware.validExistVideos,
    videosController.update
  )
  .delete(videosMiddleware.validExistVideos, videosController.delete);

module.exports = router;

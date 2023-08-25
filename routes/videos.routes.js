const express = require('express');

const { upload } = require('../utils/multer');
const videosMiddleware = require('../middlewares/videos.middleware');
const videosController = require('../controllers/videos.controllers');

const router = express.Router();

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
  .delete(videosMiddleware.validExistVideos, videosController.delete)
  .get(videosMiddleware.validExistVideos, videosController.findOne);

router.get('/', videosController.findAll);
module.exports = router;

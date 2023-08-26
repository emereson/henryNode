const express = require('express');

const dataVideosMiddleware = require('../middlewares/dataVideos.middleware');
const videosMiddleware = require('../middlewares/videos.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const dataVideosController = require('../controllers/dataVideos.controllers');

const router = express.Router();

router.get('/', dataVideosController.findAll);
router.post(
  '/:id',
  videosMiddleware.validExistVideos,
  dataVideosController.create
);
router.use(authMiddleware.protect);
router
  .route('/:id')
  .patch(dataVideosMiddleware.validExistDataVideos, dataVideosController.update)
  .delete(
    dataVideosMiddleware.validExistDataVideos,
    dataVideosController.delete
  )
  .get(dataVideosMiddleware.validExistDataVideos, dataVideosController.findOne);

module.exports = router;

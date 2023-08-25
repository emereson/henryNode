const express = require('express');

const dataVideosMiddleware = require('../middlewares/dataVideos.middleware');
const videosMiddleware = require('../middlewares/videos.middleware');

const dataVideosController = require('../controllers/dataVideos.controllers');

const router = express.Router();

router.post(
  '/:id',
  videosMiddleware.validExistVideos,
  dataVideosController.create
);
router
  .route('/:id')
  .patch(dataVideosMiddleware.validExistDataVideos, dataVideosController.update)
  .delete(
    dataVideosMiddleware.validExistDataVideos,
    dataVideosController.delete
  )
  .get(dataVideosMiddleware.validExistDataVideos, dataVideosController.findOne);

router.get('/', dataVideosController.findAll);
module.exports = router;

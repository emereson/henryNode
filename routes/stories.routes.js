const express = require('express');
const { upload } = require('../utils/multer');

const storiesMiddleware = require('../middlewares/stories.middleware');

const storiesController = require('../controllers/stories.controllers');

const router = express.Router();

router.post('/', upload.single('storiesImgUrl'), storiesController.create);
router
  .route('/:id')
  .patch(storiesMiddleware.validExistStories, storiesController.update)
  .delete(storiesMiddleware.validExistStories, storiesController.delete)
  .get(storiesMiddleware.validExistStories, storiesController.findOne);

router.get('/', storiesController.findAll);
module.exports = router;

const express = require('express');
const { upload } = require('../utils/multer');

const storiesMiddleware = require('../middlewares/stories.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const storiesController = require('../controllers/stories.controllers');

const router = express.Router();

router.get('/', storiesController.findAll);
router.post('/', upload.single('storiesImgUrl'), storiesController.create);
router.use(authMiddleware.protect);
router
  .route('/:id')
  .patch(storiesMiddleware.validExistStories, storiesController.update)
  .delete(storiesMiddleware.validExistStories, storiesController.delete)
  .get(storiesMiddleware.validExistStories, storiesController.findOne);

module.exports = router;

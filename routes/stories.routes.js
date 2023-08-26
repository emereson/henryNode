const express = require('express');
const { upload } = require('../utils/multer');

const storiesMiddleware = require('../middlewares/stories.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const storiesController = require('../controllers/stories.controllers');

const router = express.Router();

router.get('/', storiesController.findAll);
router.get(
  '/:id',
  storiesMiddleware.validExistStories,
  storiesController.findOne
);
router.use(authMiddleware.protect);
router.post('/', upload.single('storiesImgUrl'), storiesController.create);
router
  .route('/:id')
  .patch(storiesMiddleware.validExistStories, storiesController.update)
  .delete(storiesMiddleware.validExistStories, storiesController.delete);

module.exports = router;

const express = require('express');

const storiesSliceMiddleware = require('../middlewares/storiesSlice.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const storiesSliceController = require('../controllers/storiesSlice.controllers');

const router = express.Router();

router.get('/', storiesSliceController.findAll);
router.get(
  '/:id',
  storiesSliceMiddleware.validExistStoriesSlice,
  storiesSliceController.findOne
);

router.use(authMiddleware.protect);
router.post('/', storiesSliceController.create);
router
  .route('/:id')
  .patch(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.update
  )
  .delete(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.delete
  );

module.exports = router;

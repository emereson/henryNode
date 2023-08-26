const express = require('express');

const storiesSliceMiddleware = require('../middlewares/storiesSlice.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const storiesSliceController = require('../controllers/storiesSlice.controllers');

const router = express.Router();

router.get('/', storiesSliceController.findAll);
router.post('/', storiesSliceController.create);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .patch(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.update
  )
  .delete(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.delete
  )
  .get(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.findOne
  );

module.exports = router;

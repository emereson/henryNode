const express = require('express');
const storiesSliceMiddleware = require('../middlewares/storiesSlice.middleware');

const storiesSliceController = require('../controllers/storiesSlice.controllers');

const router = express.Router();

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
  )
  .get(
    storiesSliceMiddleware.validExistStoriesSlice,
    storiesSliceController.findOne
  );

router.get('/', storiesSliceController.findAll);
module.exports = router;

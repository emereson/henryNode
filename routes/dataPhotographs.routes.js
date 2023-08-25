const express = require('express');

const dataPhotographsMiddleware = require('../middlewares/dataPhotographs.middleware');
const photographsMiddleware = require('../middlewares/photographs.middleware');

const dataPhotographsController = require('../controllers/dataPhotographs.controllers');

const router = express.Router();

router.post(
  '/:id',
  photographsMiddleware.validExistPhotographs,
  dataPhotographsController.create
);
router
  .route('/:id')
  .patch(
    dataPhotographsMiddleware.validExistDataPhotographs,
    dataPhotographsController.update
  )
  .delete(
    dataPhotographsMiddleware.validExistDataPhotographs,
    dataPhotographsController.delete
  )
  .get(
    dataPhotographsMiddleware.validExistDataPhotographs,
    dataPhotographsController.findOne
  );

router.get('/', dataPhotographsController.findAll);
module.exports = router;

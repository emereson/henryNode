const express = require('express');

const dataPhotographsMiddleware = require('../middlewares/dataPhotographs.middleware');
const photographsMiddleware = require('../middlewares/photographs.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const dataPhotographsController = require('../controllers/dataPhotographs.controllers');

const router = express.Router();

router.get('/', dataPhotographsController.findAll);
router.post(
  '/:id',
  photographsMiddleware.validExistPhotographs,
  dataPhotographsController.create
);

router.use(authMiddleware.protect);
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

module.exports = router;

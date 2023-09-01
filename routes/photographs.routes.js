const express = require('express');
const { upload } = require('../utils/multerPhotos');

const photographsMiddleware = require('../middlewares/photographs.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const photographsController = require('../controllers/photographs.controllers');

const router = express.Router();

router.get('/', photographsController.findAll);
router.get(
  '/:id',
  photographsMiddleware.validExistPhotographs,
  photographsController.findOne
);

router.use(authMiddleware.protect);
router.post(
  '/',
  upload.fields([
    { name: 'photographsImgUrl', maxCount: 50 },
    { name: 'photographsFrontPage', maxCount: 1 },
  ]),
  photographsController.create
);
router
  .route('/:id')
  .patch(
    photographsMiddleware.validExistPhotographs,
    photographsController.update
  )
  .delete(
    photographsMiddleware.validExistPhotographs,
    photographsController.delete
  );

module.exports = router;

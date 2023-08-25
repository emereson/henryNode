const express = require('express');
const { upload } = require('../utils/multer');

const photographsMiddleware = require('../middlewares/photographs.middleware');

const photographsController = require('../controllers/photographs.controllers');

const router = express.Router();

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
  )
  .get(
    photographsMiddleware.validExistPhotographs,
    photographsController.findOne
  );

router.get('/', photographsController.findAll);
module.exports = router;

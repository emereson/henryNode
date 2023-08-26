const express = require('express');
const { upload } = require('../utils/multer');

const photographsMiddleware = require('../middlewares/photographs.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const photographsController = require('../controllers/photographs.controllers');

const router = express.Router();

router.get('/', photographsController.findAll);
router.post(
  '/',
  upload.fields([
    { name: 'photographsImgUrl', maxCount: 50 },
    { name: 'photographsFrontPage', maxCount: 1 },
  ]),
  photographsController.create
);
router.use(authMiddleware.protect);
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

module.exports = router;

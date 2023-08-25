const express = require('express');
const { upload } = require('../utils/multer');

const homeMiddleware = require('../middlewares/home.middleware');

const homeController = require('../controllers/home.controllers');

const router = express.Router();

router.post('/', upload.single('homeVideoUrl'), homeController.create);
router.get('/', homeController.findAll);
router
  .route('/:id')
  .patch(homeMiddleware.validExistHome, homeController.update)
  .delete(homeMiddleware.validExistHome, homeController.delete)
  .get(homeMiddleware.validExistHome, homeController.findOne);

module.exports = router;

const express = require('express');
const { upload } = require('../utils/multer');

const homeMiddleware = require('../middlewares/home.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const homeController = require('../controllers/home.controllers');

const router = express.Router();

router.get('/', homeController.findAll);
router.get('/:id', homeMiddleware.validExistHome, homeController.findOne);

router.use(authMiddleware.protect);
router.post(
  '/',
  upload.fields([{ name: 'homeVideoUrl', maxCount: 1 }]),
  homeController.create
);
router
  .route('/:id')
  .patch(
    upload.fields([{ name: 'homeVideoUrl', maxCount: 1 }]),
    homeMiddleware.validExistHome,
    homeController.update
  )
  .delete(homeMiddleware.validExistHome, homeController.delete);

module.exports = router;

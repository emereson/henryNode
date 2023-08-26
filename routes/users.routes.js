const express = require('express');

const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const validations = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controllers');

const router = express.Router();

router.post('/signup', validations.createUser, userController.signup);
router.post('/login', validations.loginUser, userController.login);
router.use(authMiddleware.protect);
router
  .use('/:id', userMiddleware.validExistUser)
  .route('/:id')
  .patch(validationMiddleware.updateUser, userController.update)
  .delete(userController.delete)
  .get(userController.findOne);
router.get('/', userController.findAll);

module.exports = router;

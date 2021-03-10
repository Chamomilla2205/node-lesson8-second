const router = require('express').Router();
const userController = require('../controller/user.controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.areUserDataOk, userController.addNewUser);

router.get('/:userId', userMiddleware.checkValidId, userController.getSingleUser);
router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;

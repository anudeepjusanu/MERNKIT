var express = require('express');
const router = express.Router();
var userController = require('../controllers/v1/users_controller');
var authenticateController = require('../controllers/v1/authenticate_controller');

router.route('/')
    .get(userController.GetUsers);
router.route('/current')
    .get(userController.GetCurrentUser);
router.route('/')
    .put(userController.UpdateUser);
router.route('/')
    .delete(userController.DeleteUser);
router.route('/')
    .post(authenticateController.Register);
module.exports = router;


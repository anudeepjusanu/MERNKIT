var express = require('express');
const router = express.Router();
var authenticateController = require('../controllers/v1/authenticate_controller');

router.route('/register')
    .post(authenticateController.Register);
router.route('/login')
    .post(authenticateController.Login);
router.get('/login', function (req, res) {
    // log user out
    delete req.session.token;
    res.send({ "type": "success" });
});
router.get('/token', function (req, res) {
    res.send(req.session.token);
});
module.exports = router;


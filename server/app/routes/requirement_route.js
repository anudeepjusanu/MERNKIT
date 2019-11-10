var express = require('express');
const router = express.Router();
var requirementController = require('../controllers/v1/requirement.controller');

router.route('/')
    .post(requirementController.Create);
router.route('/')
    .get(requirementController.GetActive);
router.route('/all')
    .get(requirementController.GetAll);

module.exports = router;


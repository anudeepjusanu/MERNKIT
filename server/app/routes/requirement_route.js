var express = require('express');
const router = express.Router();
var requirementController = require('../controllers/v1/requirement.controller');

router.route('/')
    .post(requirementController.Create);
router.route('/')
    .get(requirementController.GetActive);
router.route('/')
    .put(requirementController.Update);
router.route('/')
    .delete(requirementController.DeleteRequirement);
router.route('/all')
    .get(requirementController.GetAll);
router.route('/inactive')
    .post(requirementController.MakeInactive);

module.exports = router;


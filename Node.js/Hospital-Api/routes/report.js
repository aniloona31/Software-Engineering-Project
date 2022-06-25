const express = require('express');
const router = express.Router();
const passport = require('passport');
const report_controller = require('../controller/report_controller');

router.get('/:status',passport.authenticate('jwt',{session : false}),report_controller.getAllReports);

module.exports = router;
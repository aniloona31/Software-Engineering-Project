const express = require('express');
const router = express.Router();
const passport = require('passport');
const patient_controller = require('../controller/patient_controller');

router.post('/register',passport.authenticate('jwt',{session : false}),patient_controller.register);
router.post('/:id/create-report',passport.authenticate('jwt',{session : false}),patient_controller.createReport);
router.get('/:id/all-reports',passport.authenticate('jwt',{session : false}),patient_controller.getAllReports)
module.exports = router;
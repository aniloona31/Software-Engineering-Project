const express = require('express');
const router = express.Router();
const passport = require('passport');
const property_controller = require('../controller/property_controller');

router.post('/list-property',passport.authenticate('jwt',{session : false}),property_controller.checkRole(['LANDLORD']),property_controller.addNewProperty)
router.get('/all-properties',passport.authenticate('jwt',{session:false}),property_controller.allProperties);

module.exports = router;
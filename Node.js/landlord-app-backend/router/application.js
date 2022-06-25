const express = require('express');
const router = express.Router();
const passport = require('passport');
const {checkRole} = require('../controller/property_controller');
const application_controller = require('../controller/application_controller');

router.get('/my-property',passport.authenticate('jwt',{session:false}),checkRole(['LANDLORD']),application_controller.myProperties)
router.post('/apply/:propertyId',passport.authenticate('jwt',{session:false}),checkRole(['CUSTOMER']),application_controller.applyForProperty);
router.get('/applied-properties',passport.authenticate('jwt',{session:false}),checkRole(['CUSTOMER']),application_controller.appliedProperties);


module.exports = router;
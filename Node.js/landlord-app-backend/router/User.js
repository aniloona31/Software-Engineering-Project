const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller');
const passport = require('passport');

router.post('/landlord/login',user_controller.login);
router.post('/landlord/register',user_controller.register);
router.post('/customer/register',user_controller.register);
router.post('/customer/login',user_controller.login);

module.exports = router;
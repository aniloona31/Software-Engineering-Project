const express = require('express');
const router = express.Router();
const {Login,register} = require('../controller/doctor_controller');

router.post('/login',Login);
router.post('/register',register);

module.exports = router;
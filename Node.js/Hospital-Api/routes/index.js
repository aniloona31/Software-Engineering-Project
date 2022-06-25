const express = require('express');
const router = express.Router();

router.use('/doctor',require('./doctor'));
router.use('/patient',require('./patient'));
router.use('/report',require('./report'));

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('you are here');
})

router.use('/user',require('./User'));
router.use('/property',require('./property'));
router.use('/application',require('./application'))

module.exports = router;
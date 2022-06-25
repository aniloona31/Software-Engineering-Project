const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/mongoose');
const passportJwt = require('./config/passport-jwt');
const passport = require('passport');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

app.use('/',require('./router/index'))

app.listen(process.env.PORT,(err,res) => {
    console.log('server started on port');
})
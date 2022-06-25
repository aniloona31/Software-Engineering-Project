const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt  = require('./config/passport-jwt');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(passport.initialize());
// app.use(passport.session());

app.use('/',require('./routes/index'));


app.listen(process.env.PORT,(err,res)=>{
    console.log("server is up and running",process.env.PORT);
})
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const jwtPassport = require('./config/passport-jwt');
const googlePassport = require('./config/passport-google');
const bodyParser = require('body-parser');
const PORT = 3003;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret:"anirudh"}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/index'))


app.listen(PORT ,(err,res)=>{
    console.log("server is up and running");
})
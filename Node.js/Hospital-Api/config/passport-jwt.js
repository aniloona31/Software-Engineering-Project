const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const Doctor = require('../model/Doctor');
//to extract user info from jwt token
const ExtractJWT = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET
}

passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    Doctor.findById(jwt_payload._id,(err,user) => {
        if(err){
            console.log("error occured");
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }) 
}));

module.exports = passport;
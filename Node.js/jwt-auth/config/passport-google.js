const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/User');

passport.use(new googleStrategy({
    clientID : '874408469858-fsnaas451ha8is2lha83r3h4p4keu4lh.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : "http://localhost:3003/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    console.log(accessToken);
    User.findOne({email : profile.emails[0].value}).exec((err,user) => {
        if(err){
            console.log("error "+err);
            return;
        }
        // console.log(profile);
        if(user){
            return done(null, user);
        } 
        else{
            User.create({
                username : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },(err,user) => {
                if(err){
                    console.log("error in creating user",err);
                    return;
                }
                return done(null,user);
            })
        }
    });
}))
//serializing the user to decide which key is to be kept in the cookie
//this automatically encrypts in the cookie
passport.serializeUser((user, done) => {
    done(null, user._id);
})


//deserializing the user from the key in the cookies.
//to decrypt the encrypted id
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('error occured');
            return done(err);
        }
        return done(null, user);
    })
})

module.exports = passport;
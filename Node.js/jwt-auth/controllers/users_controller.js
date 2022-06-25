const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.signUp = async (req, res) => {

    try {
        const user = await User.findOne({ 'email': req.body.email });
        if (user) {
            return res.status(400).send({
                message: "user allready exists"
            });
        }
        //// generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        req.body.password = await bcrypt.hash(req.body.password, salt);

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.params.role
        })
        return res.status(200).send({
            message: "you are signed up"
        })
    } catch (err) {
        console.log('error while creating user', err);
        return res.status(500).send({
            message: 'internal error in creating user'
        })
    }
}

module.exports.singIn = async (req, res) => {
    const role = req.params.role;

    try {
        const user = await User.findOne({ 'email': req.body.email });

        //checking if user exists
        if (!user) {
            return res.status(400).send({
                message: "bad cridentials"
            });
        }

        //checking if role matches
        if (user.role != role) {
            return res.status(400).send({
                message: 'please choose the role assigned'
            });
        }

        //checking password
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                message: "bad cridentials"
            });
        }

        return res.status(200).send({
            message: "successfully signed in",
            data: {
                token: jwt.sign(user.toJSON(), 'anirudh', { expiresIn: '1000000' })
            }
        })



    } catch (err) {
        return res.status(500).send({
            message: "internal server error while loging in"
        });
    }
}

module.exports.checkRole = roles => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next();
    }
    return res.status(401).send({
        message: "unauthorized"
    })
}

//to check jwt by passport
module.exports.userAuth = passport.authenticate('jwt', { session: false });

module.exports.showProfile = (req, res) => {
    return res.status(200).send({
        user: req.user
    });
}


module.exports.signInGoogle = async (req, res) => {
    console.log("yes");
    try {
        const user = await User.findOne({ 'email': req.body.email });
        if (!user) {
            //// generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            //generate random passwrod/secret passwrod
            let password = await bcrypt.hash("iamgroot", salt);

            let newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: password
            })
            return res.status(200).send({
                message: "you are signed in",
                data: {
                    token: jwt.sign(newUser.toJSON(), 'anirudh', { expiresIn: '1000000' })
                }
            })
        }else{
            return res.status(200).send({
                message: "you are signed in",
                data: {
                    token: jwt.sign(user.toJSON(), 'anirudh', { expiresIn: '1000000' })
                }
            })
        }
    } catch (err) {
        console.log('error while creating user', err);
        return res.status(500).send({
            message: 'internal error in creating user'
        })
    }
}

module.exports.createSession = (req,res) =>{
    return res.status(200).send({
        message: "you are signed in",
        data: {
            token: jwt.sign(req.user.toJSON(), 'anirudh', { expiresIn: '1000000' })
        }
    })
}
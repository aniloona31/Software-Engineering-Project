const User = require('../model/User');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.findOne({ 'email': userData.email });
        if (!user) {
            return res.status(401).send({
                message: "user doesn't exist"
            });
        } else {
            const check = await bcrypt.compare(userData.password, user.password);
            if (check) {
                return res.status(200).send({
                    message: "logged in successfully",
                    token: jsonwebtoken.sign(user.toJSON(), process.env.SECRET, { expiresIn: 100000 })
                });
            } else {
                return res.status(400).send({
                    message: "bad cridentials"
                })
            }
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.register = async (req,res) =>{
    let userData = req.body;
    try {
        const user = await User.findOne({ 'email': userData.email });
        if (user) {
            return res.status(401).send({
                message: "user already exist"
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(userData.password,salt);
            
            const newUser = await User.create({
                email : userData.email,
                role : userData.role,
                username : userData.username,
                password : password
            })
            
            if(newUser){
                return res.status(200).send({
                    message : 'landlord registered'
                });
            }
            else{
                return res.status(500).send({
                    message : 'internal server error'
                });
            }
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

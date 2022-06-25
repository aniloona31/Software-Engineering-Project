const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Doctor = require('../model/Doctor');

module.exports.Login = async (req, res) => {
    try {
        const user = await Doctor.findOne({ 'email': req.body.email });

        if (!user) {
            console.log('doctor does not exist');
            return res.status(401).send({
                message: "doctor does not exist"
            })
        }


        let check = await bcrypt.compare(req.body.password, user.password);
        if (check == true) {
            return res.status(200).send({
                message: "logged in",
                token: jsonWebToken.sign(user.toJSON(), process.env.SECRET, { expiresIn: '100000000' })
            })
        } else {
            return res.status(401).send({
                message: "bad cridentials"
            })
        }

    } catch (err) {
        return res.status(500).send({
            message: "internal server error at login"
        })
    }
}

module.exports.register = async (req, res) => {
    console.log('i am here')
    try {
        const doctor = await Doctor.findOne({ 'email': req.body.email });

        if (doctor) {
            return res.status(400).send({
                message: "doctor already registered"
            })
        } else {
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);

            await Doctor.create({
                email: req.body.email,
                username: req.body.username,
                phone : req.body.phone,
                password: password
            });

            return res.status(200).send({
                message: "doctor registered"
            })
        }
    } catch (err) {
        // console.log(err);
        return res.status(500).send({
            message: "inernal server error while registering doctor"
        });
    }
}
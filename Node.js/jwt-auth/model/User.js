const mongoose = require('mongoose');

//creating new schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required: true,
        default : 'user',
        enum : ['user','admin','superadmin']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
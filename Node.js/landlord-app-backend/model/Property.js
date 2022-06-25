const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    size : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    landlord : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    rent : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    ratings : {
        type : Number
    }
});

const Property = mongoose.model('Property',propertySchema);

module.exports = Property;
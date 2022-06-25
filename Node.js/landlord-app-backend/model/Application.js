const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Property'
    },
    landlord : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        enum : ['Pending', 'Rejected', 'Accepted']
    }
})

const Application = mongoose.model('Application',applicationSchema);
module.exports = Application;
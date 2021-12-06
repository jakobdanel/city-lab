const mongoose = require('mongoose');

const {userSchema} = require('./userSchema.js');

/**
 * Schema for a DataBase Task Object. Holding a taskName as String, a user as reference to User Object ID(actually as dummy ID). details as String,
 * until as an Date Object(atm as String) and a modifier also as reference to an User Object(atm as dummy ID).
 */
module.exports = mongoose.model("Task", new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: String,
        minLength: 1,
        required: true
    },
    until: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    modifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));
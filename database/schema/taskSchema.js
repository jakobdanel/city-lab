const mongoose = require('mongoose');

const UserSchema = require('./userSchema.js');

/**
 * Schema for a DataBase Task Object. Holding a taskName as String, a user as reference to User Object ID(actually as dummy ID). details as String,
 * until as an Date Object(atm as String) and a modifier also as reference to an User Object(atm as dummy ID).
 */
module.exports = mongoose.model("Task", {
    taskName: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserSchema
    },
    details: String,
    until: String,
    modifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserSchema
    }
});
